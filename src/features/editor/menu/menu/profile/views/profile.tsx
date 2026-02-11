import { Trans, useLingui } from "@lingui/react/macro";
import { ChevronRight, KeyRound, Lock, LogOut, Mail } from "lucide-react";
import { useProfile } from "@/features/editor/profile/use-profile";
import { useLocalizedRouter } from "@/shared/lib/hooks/use-localized-router";
import { useModalViews } from "@/shared/lib/providers/modal-views/modal-views-provider";
import { cn } from "@/shared/lib/utils";
import { ActionList, type ActionListItem } from "@/shared/ui/kit/action-list";
import { AdaptiveModalContent } from "@/shared/ui/kit/overlays/adaptive-modal";
import { Button } from "@/shared/ui/kit/primitives/button";
import { SectionTitle } from "@/shared/ui/kit/section-title";
import type { ProfileNewViews } from "..";

export function ProfileView() {
  const { t } = useLingui();
  const { push } = useModalViews<ProfileNewViews>();
  const router = useLocalizedRouter();

  const { email, created_at, protected_by_password } = useProfile(
    (state) => ({
      email: state.profile.email,
      created_at: state.profile.created_at,
      protected_by_password: state.profile.protected_by_password,
    }),
    "shallow"
  );

  const actions: ActionListItem[] = [
    {
      id: "change-email",
      label: <Trans>Change email</Trans>,
      icon: Mail,
      onClick: () => push("change-email-step-1"),
      disabled: false,
    },
    {
      id: "change-password",
      label: <Trans>Change password</Trans>,
      icon: KeyRound,
      onClick: () => push("change-password-step-1"),
      disabled: !protected_by_password,
    },
    {
      id: "logout",
      label: <Trans>Logout</Trans>,
      icon: LogOut,
      onClick: () => {
        // TODO: Implement logout
        router.push("/");
      },
      disabled: false,
      className: "text-danger",
    },
  ];

  return (
    <AdaptiveModalContent>
      <div className="squircle flex flex-col gap-6 p-5">
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

      <ActionList actions={actions} className="mt-8" title={t`Actions`} />
    </AdaptiveModalContent>
  );
}
