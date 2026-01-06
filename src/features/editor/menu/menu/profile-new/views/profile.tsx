import { Trans, useLingui } from "@lingui/react/macro";
import { ChevronRight, KeyRound, Lock, Mail } from "lucide-react";
import { Fragment } from "react";
import { useProfile } from "@/features/editor/profile/use-profile";
import {
  useHandleTimers,
  useTimers,
} from "@/shared/lib/hooks/use-handle-timers";
import { useModalViews } from "@/shared/lib/providers/modal-views/modal-views-provider";
import { cn } from "@/shared/lib/utils";
import { AdaptiveModalContent } from "@/shared/ui/kit/overlays/adaptive-modal";
import { Button } from "@/shared/ui/kit/primitives/button";
import { Separator } from "@/shared/ui/kit/primitives/separator";
import { SectionTitle } from "@/shared/ui/kit/section-title";
import type { ProfileNewViews } from "..";

export function ProfileView() {
  const { t } = useLingui();
  const { push } = useModalViews<ProfileNewViews>();
  const { email, created_at, protected_by_password } = useProfile(
    (state) => ({
      email: state.profile.email,
      created_at: state.profile.created_at,
      protected_by_password: state.profile.protected_by_password,
    }),
    "shallow"
  );
  const { startTimer } = useHandleTimers();
  const emailTimerDuration = useTimers(
    (state) => state.timers.otp?.[email || ""]
  );

  const actions = [
    {
      label: t`Change email`,
      icon: Mail,
      onClick: () => {
        if (emailTimerDuration === undefined) {
          startTimer({ key: "otp", id: email, duration: 60 });
        }
        push("change-email-step-1");
      },
      disabled: false,
    },
    {
      label: t`Change password`,
      icon: KeyRound,
      onClick: () => push("change-password-step-1"),
      disabled: !protected_by_password,
    },
    // {
    //   label: t`Reset `,
    //   icon: Lock,
    //   onClick: () => push("remove-password-step-1"),
    //   disabled: !protected_by_password,
    // },
  ];

  return (
    <AdaptiveModalContent>
      <div className="squircle flex flex-col gap-6 p-4">
        <SectionTitle className="gap-1" title={t`Email`}>
          <p className="font-medium">{email || "-"}</p>
        </SectionTitle>

        <SectionTitle className="gap-1" title={t`Joined on`}>
          <p className="font-medium">
            {/* TODO: Add joined date */}
            {new Date(created_at).toLocaleDateString()}
          </p>
        </SectionTitle>

        <SectionTitle className="gap-1" title={t`Password`}>
          <p
            className={cn(
              "font-medium",
              protected_by_password ? "text-success" : "text-warning"
            )}
          >
            {protected_by_password
              ? t`Account is protected by password`
              : t`Account isn't protected by password`}
          </p>
        </SectionTitle>
      </div>

      {!protected_by_password && (
        <Button
          className="mt-8 w-full"
          onClick={() => push("add-password-step-1")}
          variant="inverse"
        >
          <Lock className="size-5" />
          <Trans>Protect profile with password</Trans>
          <ChevronRight className="size-5" />
        </Button>
      )}

      <SectionTitle
        className="mt-8"
        contentClassName="squircle flex gap-0 flex-col"
        title={t`Actions`}
      >
        {actions.map((action, index) => (
          <Fragment key={action.label}>
            <Button
              className="h-16 w-full justify-between rounded-none"
              disabled={action.disabled}
              onClick={action.onClick}
              variant="ghost"
            >
              <div className="flex items-center gap-3">
                <action.icon className="size-5 opacity-50" />
                <Trans>{action.label}</Trans>
              </div>

              <ChevronRight className="size-6 opacity-50" />
            </Button>
            {index !== actions.length - 1 && <Separator />}
          </Fragment>
        ))}
      </SectionTitle>
    </AdaptiveModalContent>
  );
}
