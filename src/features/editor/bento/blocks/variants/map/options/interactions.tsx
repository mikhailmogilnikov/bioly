import { Trans } from "@lingui/react/macro";
import { useBlockContext } from "@/features/editor/bento/grid/ui/block-context";
import { useProfile } from "@/features/editor/profile/use-profile";
import { SwitchField } from "@/shared/ui/kit/primitives/switch-field";

export function BentoBlockMapInteractions() {
  const { block } = useBlockContext<"map">();
  const updateBentoBlockField = useProfile(
    (state) => state.updateBentoBlockField
  );

  if (!block) return null;

  const { interactions } = block.properties ?? {};

  const handleInteractionsChange = (checked: boolean) => {
    if (typeof block.properties?.interactions !== "boolean") return;

    updateBentoBlockField(block.id, "properties", {
      ...block.properties,
      interactions: checked,
    });
  };

  return (
    <SwitchField
      checked={interactions}
      label={<Trans>Allow map interaction</Trans>}
      onCheckedChange={handleInteractionsChange}
    />
  );
}
