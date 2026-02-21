/** Represents a geographic address suggestion */
export interface AddressSuggestion {
  /** Address components (optional, depends on provider) */
  components?: {
    street?: string;
    houseNumber?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  /** Geographic coordinates */
  coordinates: {
    latitude: number;
    longitude: number;
  };
  /** Full formatted address */
  formattedAddress: string;
  /** Unique identifier for the suggestion */
  id: string;
  /** Display label for the address */
  label: string;
  /** Raw response from the geocoding API */
  raw?: unknown;
}

/** Configuration for geocoding adapter */
export interface GeocodingAdapterConfig {
  /** Bounding box to limit results [minLon, minLat, maxLon, maxLat] */
  boundingBox?: [number, number, number, number];
  /** Country codes to limit results (e.g., ["ru", "us"]) */
  countryCodes?: string[];
  /** Language for results (e.g., "en", "ru") */
  language?: string;
  /** Maximum number of results to return */
  limit?: number;
}

/** Interface for geocoding adapters */
export interface GeocodingAdapter {
  /** Unique name of the adapter */
  name: string;
  /** Reverse geocode coordinates to address (optional) */
  reverse?: (
    latitude: number,
    longitude: number,
    config?: GeocodingAdapterConfig
  ) => Promise<AddressSuggestion | null>;
  /** Search for addresses by query string */
  search: (
    query: string,
    config?: GeocodingAdapterConfig
  ) => Promise<AddressSuggestion[]>;
}
