import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";
import {
  ModalViewsController,
  type ModalViewsMap,
} from "@/shared/lib/providers/modal-views/modal-views-controller";

import type { ProjectSettingsViews } from ".";
import { SettingsAccessibilityView } from "./views/accessibility";
import { SettingsChangeSlugView } from "./views/change-slug";
import { SettingsView } from "./views/settings";
import { SettingsThemeView } from "./views/theme";

export function ProjectSettingsController() {
  const { t } = useLingui();

  const VIEWS_MAP: ModalViewsMap<ProjectSettingsViews> = useMemo(
    () => ({
      settings: {
        title: t`Project settings`,
        component: <SettingsView />,
      },
      theme: {
        title: t`Theme`,
        component: <SettingsThemeView />,
      },
      "change-slug": {
        title: t`Change slug`,
        component: <SettingsChangeSlugView />,
      },
      accessibility: {
        title: t`Page search accessibility`,
        component: <SettingsAccessibilityView />,
      },
    }),
    [t]
  );

  return <ModalViewsController<ProjectSettingsViews> viewsMap={VIEWS_MAP} />;
}
