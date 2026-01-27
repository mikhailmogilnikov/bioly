import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";
import { useBlockContext } from "@/features/editor/bento/grid/ui/block-context";
import { useProfile } from "@/features/editor/profile/use-profile";
import { createNominatimAdapter } from "@/shared/ui/kit/registry/address-autocomplete/adapters/nominatim";
import { AddressAutocomplete } from "@/shared/ui/kit/registry/address-autocomplete/address-autocomplete";
import type { AddressSuggestion } from "@/shared/ui/kit/registry/address-autocomplete/types";
import { SectionTitle } from "@/shared/ui/kit/section-title";

export function BentoBlockMapAddressPicker() {
  const { block } = useBlockContext<"map">();
  const { t } = useLingui();
  const updateBentoBlockField = useProfile(
    (state) => state.updateBentoBlockField
  );

  const adapter = useMemo(
    () =>
      createNominatimAdapter({
        userAgent: "Bioly/1.0",
      }),
    []
  );

  if (!block) return null;

  const handleSelect = (address: AddressSuggestion) => {
    const { latitude, longitude } = address.coordinates;
    const { city, country } = address.components ?? {};

    const title = [city, country].filter(Boolean).join(", ") || address.label;

    updateBentoBlockField(block.id, "properties", {
      ...block.properties,
      latitude,
      longitude,
      title,
    });
  };

  return (
    <SectionTitle title={t`Address picker`}>
      <AddressAutocomplete
        adapter={adapter}
        adapterConfig={{
          limit: 5,
        }}
        defaultValue={block.properties.title}
        emptyMessage={t`Address not found`}
        loadingMessage={t`Searching...`}
        onSelect={handleSelect}
        placeholder={t`Enter address...`}
      />
    </SectionTitle>
  );
}
