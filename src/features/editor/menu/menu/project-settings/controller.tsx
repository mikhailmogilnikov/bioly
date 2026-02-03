import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";
import {
  ModalViewsController,
  type ModalViewsMap,
} from "@/shared/lib/providers/modal-views/modal-views-controller";

import type { ProjectSettingsViews } from ".";
import { SettingsView } from "./views/settings";

export function ProjectSettingsController() {
  const { t } = useLingui();

  const VIEWS_MAP: ModalViewsMap<ProjectSettingsViews> = useMemo(
    () => ({
      settings: {
        title: t`Project settings`,
        component: <SettingsView />,
      },
    }),
    [t]
  );

  return <ModalViewsController<ProjectSettingsViews> viewsMap={VIEWS_MAP} />;
}
