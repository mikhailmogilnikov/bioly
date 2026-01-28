import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";
import {
  ModalViewsController,
  type ModalViewsMap,
} from "@/shared/lib/providers/modal-views/modal-views-controller";

import type { ProfileNewViews } from ".";
import { AddPasswordStep1 } from "./views/add-password/step-1";
import { AddPasswordStep2 } from "./views/add-password/step-2";
import { ChangeEmailStep1 } from "./views/change-email/step-1";
import { ChangeEmailStep2 } from "./views/change-email/step-2";
import { ChangeEmailStep3 } from "./views/change-email/step-3";
import { ChangePasswordStep1 } from "./views/change-password/step-1";
import { ChangePasswordStep2 } from "./views/change-password/step-2";
import { ProfileView } from "./views/profile";

export function ProfileNewController() {
  const { t } = useLingui();

  const VIEWS_MAP: ModalViewsMap<ProfileNewViews> = useMemo(
    () => ({
      profile: {
        title: t`Profile`,
        component: <ProfileView />,
      },
      "change-email-step-1": {
        title: t`Change Email`,
        component: <ChangeEmailStep1 />,
      },
      "change-email-step-2": {
        title: t`Enter new email`,
        component: <ChangeEmailStep2 />,
      },
      "change-email-step-3": {
        title: t`Confirm email change`,
        component: <ChangeEmailStep3 />,
      },
      "change-password-step-1": {
        title: t`Change Password`,
        component: <ChangePasswordStep1 />,
      },
      "change-password-step-2": {
        title: t`Confirm password change`,
        component: <ChangePasswordStep2 />,
      },
      "add-password-step-1": {
        title: t`Add Password`,
        component: <AddPasswordStep1 />,
      },
      "add-password-step-2": {
        title: t`Confirm password addition`,
        component: <AddPasswordStep2 />,
      },
    }),
    [t]
  );

  return <ModalViewsController<ProfileNewViews> viewsMap={VIEWS_MAP} />;
}
