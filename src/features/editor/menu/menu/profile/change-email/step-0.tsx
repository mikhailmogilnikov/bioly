import { zodResolver } from "@hookform/resolvers/zod";
import { Trans } from "@lingui/react/macro";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ChevronRightIcon } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { useProfile } from "@/features/editor/profile/use-profile";
import { useValidationSchemas } from "@/shared/lib/hooks/use-validation";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/ui/kit/primitives/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/ui/kit/primitives/input-otp";
import type { ChangeEmailStep } from "./modal";

interface ChangeEmailStep0Props {
  setStep: (step: ChangeEmailStep) => void;
}

interface OTPFormData {
  otp: string;
}

export function ChangeEmailStep0({ setStep }: ChangeEmailStep0Props) {
  const { otpSchema } = useValidationSchemas();
  const { email } = useProfile(
    (state) => ({
      email: state.profile.email,
    }),
    "shallow"
  );

  const form = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    const sendOTP = async () => {
      try {
        // TODO: API call to send OTP code to current email
        // await sendOTPToCurrentEmail(email);
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch {
        // Error handling
      }
    };

    sendOTP();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (_data: OTPFormData) => {
    try {
      // TODO: API call to verify OTP from current email
      // await verifyCurrentEmailOTP(_data.otp);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      form.reset();
      setStep("1-email");
    } catch {
      // Error handling
    }
  };

  return (
    <form
      className="flex w-full flex-col gap-4"
      id="change-email-step-0-form"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Controller
          control={form.control}
          name="otp"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="current-email-otp">
                  <Trans>Verification code</Trans>
                </FieldLabel>
                <InputOTP
                  aria-invalid={fieldState.invalid}
                  inputMode="numeric"
                  maxLength={6}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  pattern={REGEXP_ONLY_DIGITS}
                  value={field.value}
                >
                  <InputOTPGroup>
                    <InputOTPSlot aria-invalid={fieldState.invalid} index={0} />
                    <InputOTPSlot aria-invalid={fieldState.invalid} index={1} />
                    <InputOTPSlot aria-invalid={fieldState.invalid} index={2} />
                    <InputOTPSlot aria-invalid={fieldState.invalid} index={3} />
                    <InputOTPSlot aria-invalid={fieldState.invalid} index={4} />
                    <InputOTPSlot aria-invalid={fieldState.invalid} index={5} />
                  </InputOTPGroup>
                </InputOTP>
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
          Enter the 6-digit code we sent to your current email address ({email})
          to confirm your identity.
        </Trans>
      </p>

      <button
        className="group pressable mt-4 flex h-14 w-fit items-center gap-2 rounded-full bg-default px-5 font-semibold text-lg disabled:opacity-50"
        disabled={form.formState.isSubmitting}
        form="change-email-step-0-form"
        type="submit"
      >
        {form.formState.isSubmitting ? (
          <Trans>Verifying...</Trans>
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
