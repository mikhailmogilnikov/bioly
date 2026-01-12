"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trans, useLingui } from "@lingui/react/macro";
import { ChevronRightIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
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
  newPassword: string;
  confirmPassword: string;
}

export function AddPasswordStep1() {
  const { t } = useLingui();
  const { push } = useModalViews<ProfileNewViews>();
  const { setNewPassword } = useProfileStore();
  const email = useProfile((state) => state.profile.email);
  const { password, confirmPassword } = useValidationSchemas();
  const { startTimer } = useHandleTimers();

  const addPasswordSchema = z
    .object({
      newPassword: password,
      confirmPassword,
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t`Passwords do not match`,
      path: ["confirmPassword"],
    });

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(addPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: PasswordFormData) => {
    try {
      // TODO: API call to send OTP code
      // await sendOTPCode(data.newPassword);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setNewPassword(data.newPassword);

      startTimer({ key: "otp", id: email, duration: 60 });

      push("add-password-step-2");
    } catch {
      // Error handling
    }
  };

  return (
    <AdaptiveModalContent>
      <form
        className="flex w-full flex-col gap-4 px-1"
        id="add-password-step-1-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            control={form.control}
            name="newPassword"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="new-password">
                    <Trans>Password</Trans>
                  </FieldLabel>
                  <PasswordInput
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="new-password"
                    className="border-0 focus-visible:ring-link/30"
                    id="new-password"
                    placeholder={t`Enter password`}
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
                    <Trans>Confirm Password</Trans>
                  </FieldLabel>
                  <PasswordInput
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="new-password"
                    className="border-0 focus-visible:ring-link/30"
                    id="confirm-password"
                    placeholder={t`Re-enter password`}
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
            We'll send a verification code to your email address to add a
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
