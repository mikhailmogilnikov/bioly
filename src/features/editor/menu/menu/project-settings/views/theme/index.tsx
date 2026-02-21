import { Trans, useLingui } from "@lingui/react/macro";
import { UserRoundCog } from "lucide-react";
import { useModalViews } from "@/shared/lib/providers/modal-views/modal-views-provider";
import { ActionList, type ActionListItem } from "@/shared/ui/kit/action-list";
import { AdaptiveModalContent } from "@/shared/ui/kit/overlays/adaptive-modal";
import type { ProjectSettingsViews } from "../..";
import { MainSettings } from "./main-settings";

export function SettingsThemeView() {
  const { t } = useLingui();
  const { push } = useModalViews<ProjectSettingsViews>();

  const optionsActions: ActionListItem[] = [
    {
      id: "reset-theme",
      label: <Trans>Header settings</Trans>,
      icon: UserRoundCog,
      onClick: () => {
        push("theme-header");
      },
      disabled: false,
    },
  ];
  return (
    <AdaptiveModalContent>
      <div className="flex flex-col gap-6 py-1">
        <MainSettings />
        <ActionList actions={optionsActions} title={t`Options`} />
      </div>
    </AdaptiveModalContent>
  );
}
