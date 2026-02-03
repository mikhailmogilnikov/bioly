"use client";

import { MapPinIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteStatus,
} from "../../primitives/autocomplete";
import type {
  AddressSuggestion,
  GeocodingAdapter,
  GeocodingAdapterConfig,
} from "./types";

export interface AddressAutocompleteProps {
  /** Geocoding adapter to use for address lookup */
  adapter: GeocodingAdapter;
  /** Configuration for the geocoding adapter */
  adapterConfig?: GeocodingAdapterConfig;
  /** Callback when an address is selected */
  onSelect?: (address: AddressSuggestion) => void;
  /** Callback when the input value changes */
  onInputChange?: (value: string) => void;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Debounce delay in milliseconds (default: 300) */
  debounceMs?: number;
  /** Minimum characters before searching (default: 3) */
  minChars?: number;
  /** Show clear button */
  showClear?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Loading state message */
  loadingMessage?: string;
  /** Additional CSS classes for the input */
  className?: string;
  /** Initial value */
  defaultValue?: string;
  /** Controlled value */
  value?: string;
  /** Disabled state */
  disabled?: boolean;
}

export function AddressAutocomplete({
  adapter,
  adapterConfig,
  onSelect,
  onInputChange,
  placeholder = "Search address...",
  debounceMs = 700,
  minChars = 3,
  showClear = true,
  emptyMessage = "No addresses found",
  loadingMessage = "Searching...",
  className,
  defaultValue,
  value,
  disabled,
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue ?? value ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Sync controlled value
  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const searchAddresses = useCallback(
    async (query: string) => {
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      if (query.length < minChars) {
        setSuggestions([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      abortControllerRef.current = new AbortController();

      try {
        const results = await adapter.search(query, adapterConfig);
        setSuggestions(results);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Address search error:", error);
          setSuggestions([]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [adapter, adapterConfig, minChars]
  );

  const handleInputChange = useCallback(
    (newValue: string) => {
      setInputValue(newValue);
      onInputChange?.(newValue);

      // Clear previous debounce
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // Debounce search
      debounceRef.current = setTimeout(() => {
        searchAddresses(newValue);
      }, debounceMs);
    },
    [debounceMs, onInputChange, searchAddresses]
  );

  const handleSelect = useCallback(
    (suggestion: AddressSuggestion) => {
      setInputValue(suggestion.formattedAddress);
      onSelect?.(suggestion);
    },
    [onSelect]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <Autocomplete
      disabled={disabled}
      filter={null}
      items={suggestions}
      itemToStringValue={(item: AddressSuggestion) => item.formattedAddress}
      onValueChange={handleInputChange}
      value={inputValue}
    >
      <AutocompleteInput
        className={className}
        placeholder={placeholder}
        showClear={showClear}
      />
      <AutocompleteContent>
        {isLoading ? (
          <AutocompleteStatus>
            <span className="flex items-center gap-2">
              <span className="size-4 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground/60" />
              {loadingMessage}
            </span>
          </AutocompleteStatus>
        ) : null}
        <AutocompleteEmpty>{emptyMessage}</AutocompleteEmpty>
        <AutocompleteList>
          {(suggestion: AddressSuggestion) => (
            <AutocompleteItem
              key={suggestion.id}
              onClick={() => handleSelect(suggestion)}
              value={suggestion}
            >
              <MapPinIcon className="size-4 shrink-0 text-foreground/50" />
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-medium">{suggestion.label}</span>
                {suggestion.label !== suggestion.formattedAddress && (
                  <span className="truncate text-foreground/50 text-xs">
                    {suggestion.formattedAddress}
                  </span>
                )}
              </div>
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
  );
}
