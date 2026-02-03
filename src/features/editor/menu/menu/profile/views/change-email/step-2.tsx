"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trans, useLingui } from "@lingui/react/macro";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import type { components } from "@/shared/api/schema/generated";
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
import { Input } from "@/shared/ui/kit/primitives/input";
import type { ProfileNewViews } from "../..";
import { useProfileStore } from "../../use-profile-store";

type EmailFormData = components["schemas"]["ChangeEmailRequest"];

export function ChangeEmailStep2() {
  const { t } = useLingui();
  const { push } = useModalViews<ProfileNewViews>();
  const { setNewEmail, newEmail } = useProfileStore();
  const { startTimer, getTimer } = useHandleTimers();
  const { newEmail: newEmailSchema } = useValidationSchemas();

  const emailSchema = z.object({
    new_email: newEmailSchema,
  });

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      new_email: newEmail || "",
    },
  });

  const onSubmit = async (data: EmailFormData) => {
    try {
      const existingTimer = getTimer("otp", data.new_email);

      if (!existingTimer) {
        // TODO: API call to send OTP code to new email
        // await sendOTPToNewEmail(data.new_email);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setNewEmail(data.new_email);

      startTimer({ key: "otp", id: data.new_email, duration: 60 });

      push("change-email-step-2");
    } catch {
      // Error handling
    }
  };

  return (
    <AdaptiveModalContent>
      <form
        className="flex w-full flex-col gap-4 px-1"
        id="change-email-step-1-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            control={form.control}
            name="new_email"
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
                  {fieldState.invalid && fieldState.error ? (
                    <FieldError
                      className="text-start"
                      errors={[fieldState.error]}
                    />
                  ) : null}
                </FieldContent>
              </Field>
            )}
          />
        </FieldGroup>

        <p className="text-foreground/50 text-sm">
          <Trans>
            We'll send a verification code to the new email address to change
            your email.
          </Trans>
        </p>

        <Button
          className="mt-4"
          disabled={form.formState.isSubmitting}
          type="submit"
          variant="inverse"
        >
          {form.formState.isSubmitting ? (
            <Trans>Sending...</Trans>
          ) : (
            <Trans>Continue</Trans>
          )}
        </Button>
      </form>
    </AdaptiveModalContent>
  );
}
