import { Trans, useLingui } from "@lingui/react/macro";
import { Brush, Globe } from "lucide-react";
import { useModalViews } from "@/shared/lib/providers/modal-views/modal-views-provider";
import { ActionList, type ActionListItem } from "@/shared/ui/kit/action-list";
import { AdaptiveModalContent } from "@/shared/ui/kit/overlays/adaptive-modal";
import type { ProjectSettingsViews } from "../..";
import { SettingsMyLink } from "./my-link";

export function SettingsView() {
  const { t } = useLingui();
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
      label: <Trans>Page search accessibility</Trans>,
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
        <ActionList
          actions={settingsActions}
          className="mt-4"
          title={t`Settings`}
        />
      </div>
    </AdaptiveModalContent>
  );
}
