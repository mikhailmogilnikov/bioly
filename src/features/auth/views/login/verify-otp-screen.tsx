import { zodResolver } from "@hookform/resolvers/zod";
import { Trans, useLingui } from "@lingui/react/macro";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { useLocalizedRouter } from "@/shared/lib/hooks/use-localized-router";
import { Button } from "@/shared/ui/kit/primitives/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
} from "@/shared/ui/kit/primitives/field";
import { InputOTP, InputOTPSlot } from "@/shared/ui/kit/primitives/input-otp";
import { useAuthContext } from "../../model/provider";
import { LoginResendButton } from "./resend";

interface OTPFormData {
  otp: string;
}

export function LoginVerifyOtpScreen() {
  const { t } = useLingui();
  const { navigateToScreen } = useAuthContext();
  const router = useLocalizedRouter();

  const otpSchema = z.object({
    otp: z
      .string()
      .length(6, t`Verification code must be 6 digits`)
      .regex(new RegExp(REGEXP_ONLY_DIGITS), t`Only digits are allowed`),
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
      id="reset-password-step-2-form"
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

      <LoginResendButton />

      <Button
        className="group mt-4 text-link"
        disabled={form.formState.isSubmitting}
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

      <Button
        className="group mt-2 flex items-center gap-1 rounded-xl font-medium text-foreground/50 text-sm hover:text-foreground/50"
        onClick={() => navigateToScreen("enter-email")}
        size="sm"
        type="button"
        variant="ghost"
      >
        <ChevronLeftIcon className="-ml-1 size-4 transition-transform group-hover:-translate-x-0.5" />
        <Trans>Back to enter email</Trans>
      </Button>
    </form>
  );
}
