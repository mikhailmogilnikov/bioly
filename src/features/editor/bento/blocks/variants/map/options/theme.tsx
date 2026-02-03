import { useLingui } from "@lingui/react/macro";
import { useBlockContext } from "@/features/editor/bento/grid/ui/block-context";
import { useProfile } from "@/features/editor/profile/use-profile";
import { SelectMenu } from "@/shared/ui/kit/primitives/select-menu";
import { SectionTitle } from "@/shared/ui/kit/section-title";
import {
  type BentoBlockMapThemesOptions,
  BentoBlockMapThemesOptions as ThemeOptions,
} from "../types";

const options = Object.values(ThemeOptions);

export function BentoBlockMapTheme() {
  const { t } = useLingui();
  const { block } = useBlockContext<"map">();
  const updateBentoBlockField = useProfile(
    (state) => state.updateBentoBlockField
  );

  if (!block) return null;

  const handleThemeChange = (theme: BentoBlockMapThemesOptions) => {
    if (typeof block.properties?.theme !== "string") return;

    updateBentoBlockField(block.id, "properties", {
      ...block.properties,
      theme,
    });
  };

  return (
    <SectionTitle title={t`Map theme`}>
      <SelectMenu
        onSelect={handleThemeChange}
        options={options}
        value={block.properties?.theme ?? "auto"}
      />
    </SectionTitle>
  );
}
