/** Represents a geographic address suggestion */
export interface AddressSuggestion {
  /** Unique identifier for the suggestion */
  id: string;
  /** Display label for the address */
  label: string;
  /** Full formatted address */
  formattedAddress: string;
  /** Geographic coordinates */
  coordinates: {
    latitude: number;
    longitude: number;
  };
  /** Address components (optional, depends on provider) */
  components?: {
    street?: string;
    houseNumber?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  /** Raw response from the geocoding API */
  raw?: unknown;
}

/** Configuration for geocoding adapter */
export interface GeocodingAdapterConfig {
  /** Language for results (e.g., "en", "ru") */
  language?: string;
  /** Country codes to limit results (e.g., ["ru", "us"]) */
  countryCodes?: string[];
  /** Maximum number of results to return */
  limit?: number;
  /** Bounding box to limit results [minLon, minLat, maxLon, maxLat] */
  boundingBox?: [number, number, number, number];
}

/** Interface for geocoding adapters */
export interface GeocodingAdapter {
  /** Unique name of the adapter */
  name: string;
  /** Search for addresses by query string */
  search: (
    query: string,
    config?: GeocodingAdapterConfig
  ) => Promise<AddressSuggestion[]>;
  /** Reverse geocode coordinates to address (optional) */
  reverse?: (
    latitude: number,
    longitude: number,
    config?: GeocodingAdapterConfig
  ) => Promise<AddressSuggestion | null>;
}
