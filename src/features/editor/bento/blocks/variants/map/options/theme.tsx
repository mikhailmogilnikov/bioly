import { useLingui } from "@lingui/react/macro";
import { Menu } from "bloom-menu";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useBlockContext } from "@/features/editor/bento/grid/ui/block-context";
import { useProfile } from "@/features/editor/profile/use-profile";
import { SectionTitle } from "@/shared/ui/kit/section-title";
import { BentoBlockMapThemes } from "../types";

const itemClass =
  "flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-foreground hover:bg-foreground/10 justify-between";

export function BentoBlockMapTheme() {
  const { t } = useLingui();
  const { block } = useBlockContext<"map">();
  const updateBentoBlockField = useProfile(
    (state) => state.updateBentoBlockField
  );

  if (!block) return null;

  const handleThemeChange = (theme: BentoBlockMapThemes) => {
    updateBentoBlockField(block.id, "properties", {
      ...block.properties,
      theme,
    });
  };

  return (
    <SectionTitle title={t`Map theme`}>
      <Menu.Root anchor="start" direction="bottom">
        <Menu.Container
          buttonRadius={20}
          buttonSize={{ width: 206, height: 40 }}
          className="bg-default shadow-lg ring-1 ring-black/5"
          menuRadius={12}
          menuWidth={160}
        >
          <Menu.Trigger>
            <span className="flex w-full items-center justify-between gap-2 px-4 py-2">
              <p className="font-medium text-sm first-letter:capitalize">
                {block.properties.theme}
              </p>

              <ChevronDownIcon className="size-4 opacity-50" />
            </span>
          </Menu.Trigger>
          <Menu.Content className="p-2">
            {Object.values(BentoBlockMapThemes).map((theme) => (
              <Menu.Item
                className={itemClass}
                key={theme}
                onSelect={() => handleThemeChange(theme)}
              >
                <p className="font-medium text-sm first-letter:capitalize">
                  {theme}
                </p>
                {block.properties.theme === theme && (
                  <CheckIcon className="size-4" />
                )}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Container>
      </Menu.Root>
    </SectionTitle>
  );
}
