import { zodResolver } from "@hookform/resolvers/zod";
import { Trans, useLingui } from "@lingui/react/macro";
import { ChevronRightIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/ui/kit/primitives/field";
import { Input } from "@/shared/ui/kit/primitives/input";
import type { ChangeEmailStep } from "./modal";

type ChangeEmailStep1Props = {
  setStep: (step: ChangeEmailStep) => void;
  newEmail: string;
  setNewEmail: (email: string) => void;
};

type EmailFormData = {
  newEmail: string;
};

export function ChangeEmailStep1({
  setStep,
  newEmail,
  setNewEmail,
}: ChangeEmailStep1Props) {
  const { t } = useLingui();

  const emailSchema = z.object({
    newEmail: z
      .string()
      .min(1, t`Enter new email`)
      .email(t`Invalid email address`),
  });

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      newEmail,
    },
  });

  const onSubmit = async (data: EmailFormData) => {
    try {
      // TODO: API call to send OTP code
      // await sendOTPCode(data.newEmail);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setNewEmail(data.newEmail);
      setStep("2-otp");
    } catch {
      // Error handling
    }
  };

  return (
    <form
      className="flex w-full flex-col gap-4"
      id="change-email-step-1-form"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Controller
          control={form.control}
          name="newEmail"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="new-email">
                  <Trans>New Email</Trans>
                </FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoComplete="email"
                  className="border-0 focus-visible:ring-link/30"
                  id="new-email"
                  placeholder={t`Enter new email`}
                  type="email"
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
          We'll send a verification code to the new email address to change your
          email.
        </Trans>
      </p>

      <button
        className="group pressable mt-4 flex h-14 w-fit items-center gap-2 rounded-full bg-default px-5 font-semibold text-lg disabled:opacity-50"
        disabled={form.formState.isSubmitting}
        form="change-email-step-1-form"
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
