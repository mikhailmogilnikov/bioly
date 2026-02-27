import { Trans, useLingui } from "@lingui/react/macro";
import { Brush, Globe } from "lucide-react";
import { LOCALES_DATA, type Locale } from "@/shared/i18n/locales-data";
import { useModalViews } from "@/shared/lib/providers/modal-views/modal-views-provider";
import { ActionList, type ActionListItem } from "@/shared/ui/kit/action-list";
import { AdaptiveModalContent } from "@/shared/ui/kit/overlays/adaptive-modal";
import { SectionTitle } from "@/shared/ui/kit/section-title";
import { LangPicker } from "@/shared/ui/utils/lang-picker";
import type { ProjectSettingsViews } from "../..";
import { SettingsMyLink } from "./my-link";

export function SettingsView() {
  const { t, i18n } = useLingui();
  const { push } = useModalViews<ProjectSettingsViews>();

  const settingsActions: ActionListItem[] = [
    {
      id: "theme",
      label: <Trans>Theme & styling</Trans>,
      icon: Brush,
      onClick: () => {
        push("theme");
      },
      disabled: false,
    },
    {
      id: "accessibility",
      label: <Trans>Search accessibility</Trans>,
      icon: Globe,
      onClick: () => {
        push("accessibility");
      },
      disabled: false,
    },
  ];

  return (
    <AdaptiveModalContent>
      <div className="flex flex-col gap-6 py-1">
        <SettingsMyLink />

        <SectionTitle
          contentClassName="squircle flex flex-row w-full items-center justify-between gap-2 p-4"
          title={t`Interface language`}
        >
          <p className="font-medium text-base">
            {LOCALES_DATA[i18n.locale as Locale].name}
          </p>
          <LangPicker className="bg-foreground/10 px-4 py-2" />
        </SectionTitle>

        <ActionList actions={settingsActions} title={t`Settings`} />
      </div>
    </AdaptiveModalContent>
  );
}
