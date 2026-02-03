import { Trans } from "@lingui/react/macro";
import { useBlockContext } from "@/features/editor/bento/grid/ui/block-context";
import { useProfile } from "@/features/editor/profile/use-profile";
import { SwitchField } from "@/shared/ui/kit/primitives/switch-field";

export function BentoBlockMapLabels() {
  const { block } = useBlockContext<"map">();
  const updateBentoBlockField = useProfile(
    (state) => state.updateBentoBlockField
  );

  if (!block) return null;

  const { labels } = block.properties ?? {};

  const handleLabelsChange = (checked: boolean) => {
    if (typeof block.properties?.labels !== "boolean") return;

    updateBentoBlockField(block.id, "properties", {
      ...block.properties,
      labels: checked,
    });
  };

  return (
    <SwitchField
      checked={labels}
      label={<Trans>Map labels</Trans>}
      onCheckedChange={handleLabelsChange}
    />
  );
}
