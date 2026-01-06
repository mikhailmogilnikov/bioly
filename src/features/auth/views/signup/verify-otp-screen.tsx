"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trans } from "@lingui/react/macro";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ChevronRightIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { useLocalizedRouter } from "@/shared/lib/hooks/use-localized-router";
import { useValidationSchemas } from "@/shared/lib/hooks/use-validation";
import { Button } from "@/shared/ui/kit/primitives/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
} from "@/shared/ui/kit/primitives/field";
import { InputOTP, InputOTPSlot } from "@/shared/ui/kit/primitives/input-otp";
import { BackButton } from "../../back-button";
import { useAuthContext } from "../../model/provider";
import { ResendOtpButton } from "../login/resend";

interface OTPFormData {
  otp: string;
}

export function SignupVerifyOtpScreen() {
  const { navigateToScreen, email } = useAuthContext();
  const router = useLocalizedRouter();
  const { otp } = useValidationSchemas();

  const otpSchema = z.object({
    otp,
  });

  const form = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (_data: OTPFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/editor");
    } catch {
      // Error handling
      form.reset();
    }
  };

  return (
    <form
      className="flex w-full flex-col items-center justify-center gap-4"
      id="signup-verify-otp-form"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Controller
          control={form.control}
          name="otp"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldContent className="items-center justify-center gap-6">
                <InputOTP
                  aria-invalid={fieldState.invalid}
                  autoFocus
                  disabled={form.formState.isSubmitting}
                  inputMode="numeric"
                  maxLength={6}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  onComplete={() => {
                    form.handleSubmit(onSubmit)();
                  }}
                  pattern={REGEXP_ONLY_DIGITS}
                  ref={field.ref}
                  value={field.value}
                >
                  {Array.from({ length: 6 }).map((_, index) => (
                    <InputOTPSlot
                      aria-invalid={fieldState.invalid}
                      className="size-13 rounded-xl border-none text-2xl"
                      index={index}
                      // biome-ignore lint/suspicious/noArrayIndexKey: static index
                      key={index}
                    />
                  ))}
                </InputOTP>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />
      </FieldGroup>

      <ResendOtpButton email={email || ""} />

      <Button
        className="group mt-4 text-link"
        disabled={form.formState.isSubmitting}
        type="submit"
      >
        {form.formState.isSubmitting ? (
          <Trans>Verifying...</Trans>
        ) : (
          <Trans>Verify code</Trans>
        )}
        <ChevronRightIcon
          className="size-5 transition-transform group-hover:translate-x-0.5"
          strokeWidth={2.2}
        />
      </Button>

      <BackButton onClick={() => navigateToScreen("signup-enter-slug")}>
        <Trans>Back to enter slug</Trans>
      </BackButton>
    </form>
  );
}
