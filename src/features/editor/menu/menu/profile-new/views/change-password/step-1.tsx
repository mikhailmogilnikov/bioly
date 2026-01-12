"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trans, useLingui } from "@lingui/react/macro";
import { ChevronRightIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useProfile } from "@/features/editor/profile/use-profile";
import { useHandleTimers } from "@/shared/lib/hooks/use-handle-timers";
import { useValidationSchemas } from "@/shared/lib/hooks/use-validation";
import { useModalViews } from "@/shared/lib/providers/modal-views/modal-views-provider";
import { AdaptiveModalContent } from "@/shared/ui/kit/overlays/adaptive-modal";
import { Button } from "@/shared/ui/kit/primitives/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/ui/kit/primitives/field";
import { PasswordInput } from "@/shared/ui/kit/primitives/password-input";
import type { ProfileNewViews } from "../..";
import { useProfileStore } from "../../use-profile-store";

interface PasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function ChangePasswordStep1() {
  const { t } = useLingui();
  const { push } = useModalViews<ProfileNewViews>();
  const { setNewPassword } = useProfileStore();
  const email = useProfile((state) => state.profile.email);
  const { passwordSchema } = useValidationSchemas();
  const { startTimer, getTimer } = useHandleTimers();

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: PasswordFormData) => {
    try {
      const existingTimer = getTimer("otp", email);

      if (!existingTimer) {
        // TODO: API call to send OTP code
        // await sendOTPCode(data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setNewPassword(data.newPassword);

      startTimer({ key: "otp", id: email, duration: 60 });

      push("change-password-step-2");
    } catch {
      // Error handling
    }
  };

  return (
    <AdaptiveModalContent>
      <form
        className="flex w-full flex-col gap-4 px-1"
        id="change-password-step-1-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            control={form.control}
            name="oldPassword"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="old-password">
                    <Trans>Current Password</Trans>
                  </FieldLabel>
                  <PasswordInput
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="current-password"
                    className="border-0 focus-visible:ring-link/30"
                    id="old-password"
                    placeholder={t`Enter current password`}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      className="text-start"
                      errors={[fieldState.error]}
                    />
                  )}
                </FieldContent>
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="newPassword"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="new-password">
                    <Trans>New Password</Trans>
                  </FieldLabel>
                  <PasswordInput
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="new-password"
                    className="border-0 focus-visible:ring-link/30"
                    id="new-password"
                    placeholder={t`Enter new password`}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      className="text-start"
                      errors={[fieldState.error]}
                    />
                  )}
                </FieldContent>
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="confirm-password">
                    <Trans>Confirm New Password</Trans>
                  </FieldLabel>
                  <PasswordInput
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="new-password"
                    className="border-0 focus-visible:ring-link/30"
                    id="confirm-password"
                    placeholder={t`Re-enter new password`}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      className="text-start"
                      errors={[fieldState.error]}
                    />
                  )}
                </FieldContent>
              </Field>
            )}
          />
        </FieldGroup>

        <p className="text-foreground/50 text-sm">
          <Trans>
            We'll send a verification code to your email address to change your
            password.
          </Trans>
        </p>

        <Button
          className="group mt-4"
          disabled={form.formState.isSubmitting}
          type="submit"
          variant="inverse"
        >
          {form.formState.isSubmitting ? (
            <Trans>Sending code...</Trans>
          ) : (
            <Trans>Continue</Trans>
          )}
          <ChevronRightIcon
            className="size-5 transition-transform group-hover:translate-x-0.5"
            strokeWidth={2.2}
          />
        </Button>
      </form>
    </AdaptiveModalContent>
  );
}
