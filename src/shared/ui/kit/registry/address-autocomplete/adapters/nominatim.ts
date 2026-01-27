import type {
  AddressSuggestion,
  GeocodingAdapter,
  GeocodingAdapterConfig,
} from "../types";

interface NominatimResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    road?: string;
    house_number?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
    country_code?: string;
    postcode?: string;
  };
  boundingbox: [string, string, string, string];
}

interface NominatimAdapterOptions {
  /** Custom Nominatim server URL (default: https://nominatim.openstreetmap.org) */
  baseUrl?: string;
  /** User-Agent header (required by Nominatim ToS) */
  userAgent?: string;
  /** Email for Nominatim API (recommended by ToS) */
  email?: string;
  /** Auto-detect language from input (default: true) */
  autoDetectLanguage?: boolean;
  /** Prioritize results with house numbers (default: true) */
  prioritizeHouseLevel?: boolean;
}

/** Script detection ranges: [min, max, language] */
const SCRIPT_RANGES: [number, number, string][] = [
  [0x04_00, 0x05_2f, "ru"], // Cyrillic
  [0x00_41, 0x00_7a, "en"], // Latin
  [0x4e_00, 0x9f_ff, "zh"], // Chinese
  [0x06_00, 0x06_ff, "ar"], // Arabic
  [0x05_90, 0x05_ff, "he"], // Hebrew
  [0x30_40, 0x30_ff, "ja"], // Japanese
  [0xac_00, 0xd7_af, "ko"], // Korean
];

function getScriptLanguage(code: number): string | null {
  for (const [min, max, lang] of SCRIPT_RANGES) {
    if (code >= min && code <= max) return lang;
  }
  return null;
}

/**
 * Detects language from input text based on character scripts
 */
function detectLanguage(text: string): string | null {
  const counts: Record<string, number> = {};

  for (const char of text) {
    const lang = getScriptLanguage(char.charCodeAt(0));
    if (lang) {
      counts[lang] = (counts[lang] ?? 0) + 1;
    }
  }

  // Find dominant language
  let dominant: string | null = null;
  let maxCount = 0;

  for (const [lang, count] of Object.entries(counts)) {
    if (count > maxCount) {
      dominant = lang;
      maxCount = count;
    }
  }

  return dominant;
}

/**
 * Creates a Nominatim (OpenStreetMap) geocoding adapter
 *
 * Note: Nominatim has usage limits (1 request/second).
 * For production, consider using a paid provider or self-hosting.
 *
 * @see https://nominatim.org/release-docs/latest/api/Search/
 */
export function createNominatimAdapter(
  options: NominatimAdapterOptions = {}
): GeocodingAdapter {
  const {
    baseUrl = "https://nominatim.openstreetmap.org",
    userAgent = "AddressAutocomplete/1.0",
    email,
    autoDetectLanguage = true,
    prioritizeHouseLevel = true,
  } = options;

  const buildSearchUrl = (
    query: string,
    config?: GeocodingAdapterConfig,
    detectedLanguage?: string | null
  ): string => {
    const params = new URLSearchParams({
      q: query,
      format: "json",
      addressdetails: "1",
      // Request more results to filter later if prioritizing house level
      limit: String(
        prioritizeHouseLevel ? (config?.limit ?? 5) * 3 : (config?.limit ?? 5)
      ),
    });

    // Use detected language if auto-detect is enabled, otherwise use config language
    const language =
      autoDetectLanguage && detectedLanguage
        ? detectedLanguage
        : config?.language;

    if (language) {
      params.set("accept-language", language);
    }

    if (config?.countryCodes?.length) {
      params.set("countrycodes", config.countryCodes.join(","));
    }

    if (config?.boundingBox) {
      const [minLon, minLat, maxLon, maxLat] = config.boundingBox;
      params.set("viewbox", `${minLon},${maxLat},${maxLon},${minLat}`);
      params.set("bounded", "1");
    }

    if (email) {
      params.set("email", email);
    }

    return `${baseUrl}/search?${params.toString()}`;
  };

  const buildReverseUrl = (
    lat: number,
    lon: number,
    config?: GeocodingAdapterConfig
  ): string => {
    const params = new URLSearchParams({
      lat: String(lat),
      lon: String(lon),
      format: "json",
      addressdetails: "1",
    });

    if (config?.language) {
      params.set("accept-language", config.language);
    }

    if (email) {
      params.set("email", email);
    }

    return `${baseUrl}/reverse?${params.toString()}`;
  };

  const mapResponseToSuggestion = (
    item: NominatimResponse
  ): AddressSuggestion => {
    const { address } = item;
    const city = address.city || address.town || address.village;

    // Build a better label for house-level results
    let label = item.name || item.display_name.split(",")[0];

    // If we have street and house number, create a proper address label
    if (address.road && address.house_number) {
      label = `${address.road}, ${address.house_number}`;
    } else if (address.road) {
      label = address.road;
    }

    // Build shorter formatted address
    const addressParts: string[] = [];
    if (address.road) {
      addressParts.push(
        address.house_number
          ? `${address.road}, ${address.house_number}`
          : address.road
      );
    }
    if (city) addressParts.push(city);
    if (address.country) addressParts.push(address.country);

    const formattedAddress =
      addressParts.length > 0 ? addressParts.join(", ") : item.display_name;

    return {
      id: String(item.place_id),
      label,
      formattedAddress,
      coordinates: {
        latitude: Number.parseFloat(item.lat),
        longitude: Number.parseFloat(item.lon),
      },
      components: {
        street: address.road,
        houseNumber: address.house_number,
        city,
        state: address.state,
        country: address.country,
        postalCode: address.postcode,
      },
      raw: item,
    };
  };

  /**
   * Checks if the result is at house/building level
   */
  const isHouseLevel = (item: NominatimResponse): boolean => {
    // place_rank 30 = house/building level in Nominatim
    // addresstype "building" or "house" also indicates house level
    return (
      item.place_rank >= 28 ||
      item.addresstype === "building" ||
      item.addresstype === "house" ||
      item.type === "house" ||
      item.type === "building" ||
      Boolean(item.address.house_number)
    );
  };

  return {
    name: "nominatim",

    async search(
      query: string,
      config?: GeocodingAdapterConfig
    ): Promise<AddressSuggestion[]> {
      if (!query.trim()) return [];

      // Auto-detect language from query
      const detectedLanguage = autoDetectLanguage
        ? detectLanguage(query)
        : null;

      try {
        const response = await fetch(
          buildSearchUrl(query, config, detectedLanguage),
          {
            headers: {
              "User-Agent": userAgent,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Nominatim API error: ${response.status}`);
        }

        let data: NominatimResponse[] = await response.json();

        // Prioritize house-level results
        if (prioritizeHouseLevel && data.length > 0) {
          // Sort: house-level first, then by importance
          data = data.sort((a, b) => {
            const aIsHouse = isHouseLevel(a);
            const bIsHouse = isHouseLevel(b);

            if (aIsHouse && !bIsHouse) return -1;
            if (!aIsHouse && bIsHouse) return 1;

            // If both are same level, sort by importance
            return b.importance - a.importance;
          });

          // Limit to requested amount
          data = data.slice(0, config?.limit ?? 5);
        }

        return data.map(mapResponseToSuggestion);
      } catch (error) {
        console.error("Nominatim search error:", error);
        return [];
      }
    },

    async reverse(
      latitude: number,
      longitude: number,
      config?: GeocodingAdapterConfig
    ): Promise<AddressSuggestion | null> {
      try {
        const response = await fetch(
          buildReverseUrl(latitude, longitude, config),
          {
            headers: {
              "User-Agent": userAgent,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Nominatim API error: ${response.status}`);
        }

        const data: NominatimResponse = await response.json();

        if (!data.place_id) return null;

        return mapResponseToSuggestion(data);
      } catch (error) {
        console.error("Nominatim reverse error:", error);
        return null;
      }
    },
  };
}
