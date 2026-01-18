import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";
import { useBlockContext } from "@/features/editor/bento/grid/ui/block-context";
import { useProfile } from "@/features/editor/profile/use-profile";
import { SelectMenu } from "@/shared/ui/kit/primitives/select-menu";
import { SectionTitle } from "@/shared/ui/kit/section-title";
import {
  type BentoBlockMapTitleAlign,
  BentoBlockMapTitleAlignOptions,
} from "../types";

const options = Object.values(BentoBlockMapTitleAlignOptions);

export function BentoBlockMapTitleAlignOption() {
  const { t } = useLingui();
  const { block } = useBlockContext<"map">();
  const updateBentoBlockField = useProfile(
    (state) => state.updateBentoBlockField
  );

  const labels = useMemo(
    () =>
      ({
        "bottom-left": t`Bottom left`,
        "bottom-right": t`Bottom right`,
        "top-left": t`Top left`,
        "top-right": t`Top right`,
      }) as Record<BentoBlockMapTitleAlign, string>,
    [t]
  );

  if (!block) return null;

  const handleAlignChange = (titleAlign: BentoBlockMapTitleAlign) => {
    updateBentoBlockField(block.id, "properties", {
      ...block.properties,
      titleAlign,
    });
  };

  return (
    <SectionTitle title={t`Title position`}>
      <SelectMenu
        labels={labels}
        onSelect={handleAlignChange}
        options={options}
        value={block.properties.titleAlign}
      />
    </SectionTitle>
  );
}
