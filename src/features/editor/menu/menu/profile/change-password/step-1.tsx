import { zodResolver } from "@hookform/resolvers/zod";
import { Trans, useLingui } from "@lingui/react/macro";
import { ChevronRightIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/ui/kit/primitives/field";
import { PasswordInput } from "@/shared/ui/kit/primitives/password-input";
import type { ChangePasswordStep } from "./modal";
import { useChangePasswordSchemas } from "./use-change-password-schemas";

type ChangePasswordStep1Props = {
  setStep: (step: ChangePasswordStep) => void;
  passwordData: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  setPasswordData: (data: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => void;
};

type PasswordFormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export function ChangePasswordStep1({
  setStep,
  passwordData,
  setPasswordData,
}: ChangePasswordStep1Props) {
  const { t } = useLingui();
  const { passwordSchema } = useChangePasswordSchemas();

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: passwordData.oldPassword,
      newPassword: passwordData.newPassword,
      confirmPassword: passwordData.confirmPassword,
    },
  });

  const onSubmit = async (data: PasswordFormData) => {
    try {
      // TODO: API call to send OTP code
      // await sendOTPCode(data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPasswordData(data);
      setStep("2-otp");
    } catch {
      // Error handling
    }
  };

  return (
    <form
      className="flex w-full flex-col gap-4"
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
                  <FieldError errors={[fieldState.error]} />
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
                  <FieldError errors={[fieldState.error]} />
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
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />
      </FieldGroup>

      <p className="-mt-2 text-foreground/50 text-sm">
        <Trans>
          We'll send a verification code to your email address to change your
          password.
        </Trans>
      </p>

      <button
        className="group pressable mt-4 flex h-14 w-fit items-center gap-2 rounded-full bg-default px-5 font-semibold text-lg disabled:opacity-50"
        disabled={form.formState.isSubmitting}
        form="change-password-step-1-form"
        type="submit"
      >
        {form.formState.isSubmitting ? (
          <Trans>Sending code...</Trans>
        ) : (
          <Trans>Continue</Trans>
        )}
        <ChevronRightIcon
          className="size-5 transition-transform group-hover:translate-x-0.5"
          strokeWidth={2.8}
        />
      </button>
    </form>
  );
}
