import { zodResolver } from "@hookform/resolvers/zod";
import { Trans } from "@lingui/react/macro";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
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

interface ChangeEmailStep2Props {
  newEmail: string;
  setStep: (step: ChangeEmailStep) => void;
  onSuccess: () => void;
}

interface OTPFormData {
  otp: string;
}

export function ChangeEmailStep2({
  newEmail,
  setStep,
  onSuccess,
}: ChangeEmailStep2Props) {
  const { otpSchema } = useValidationSchemas();

  const form = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (_data: OTPFormData) => {
    try {
      // TODO: API call to verify OTP and change email
      // await verifyOTPAndChangeEmail(_data.otp);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      form.reset();
      onSuccess();
    } catch {
      // Error handling
    }
  };

  return (
    <div className="flex w-full flex-col items-start justify-start gap-4">
      <button
        className="flex w-full items-center gap-1 font-medium text-base"
        onClick={() => setStep("1-email")}
        type="button"
      >
        <ChevronLeftIcon className="size-5 opacity-50" strokeWidth={2.3} />
        <span className="text-foreground/50">
          <Trans>Email:</Trans>
        </span>{" "}
        {newEmail}
      </button>

      <form
        className="mt-2 flex w-full flex-col gap-4"
        id="change-email-step-2-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            control={form.control}
            name="otp"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="otp">
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
                      <InputOTPSlot
                        aria-invalid={fieldState.invalid}
                        index={0}
                      />
                      <InputOTPSlot
                        aria-invalid={fieldState.invalid}
                        index={1}
                      />
                      <InputOTPSlot
                        aria-invalid={fieldState.invalid}
                        index={2}
                      />
                      <InputOTPSlot
                        aria-invalid={fieldState.invalid}
                        index={3}
                      />
                      <InputOTPSlot
                        aria-invalid={fieldState.invalid}
                        index={4}
                      />
                      <InputOTPSlot
                        aria-invalid={fieldState.invalid}
                        index={5}
                      />
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
            Enter the 6-digit code we sent to the new email address.
          </Trans>
        </p>

        <button
          className="group pressable mt-4 flex h-14 w-fit items-center gap-2 rounded-full bg-default px-5 font-semibold text-lg disabled:opacity-50"
          disabled={form.formState.isSubmitting}
          form="change-email-step-2-form"
          type="submit"
        >
          {form.formState.isSubmitting ? (
            <Trans>Verifying...</Trans>
          ) : (
            <Trans>Verify code</Trans>
          )}
          <ChevronRightIcon
            className="size-5 transition-transform group-hover:translate-x-0.5"
            strokeWidth={2.8}
          />
        </button>
      </form>
    </div>
  );
}
