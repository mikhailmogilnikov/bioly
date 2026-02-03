import { zodResolver } from "@hookform/resolvers/zod";
import { Trans } from "@lingui/react/macro";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ChevronRightIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { ResendOtpButton } from "@/features/auth/views/login/resend";
import { useProfile } from "@/features/editor/profile/use-profile";
import type { components } from "@/shared/api/schema/generated";
import { useValidationSchemas } from "@/shared/lib/hooks/use-validation";
import { useModalViews } from "@/shared/lib/providers/modal-views/modal-views-provider";
import { AdaptiveModalContent } from "@/shared/ui/kit/overlays/adaptive-modal";
import { Button } from "@/shared/ui/kit/primitives/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
} from "@/shared/ui/kit/primitives/field";
import { InputOTP, InputOTPSlot } from "@/shared/ui/kit/primitives/input-otp";
import type { ProfileNewViews } from "../..";
import { useProfileStore } from "../../use-profile-store";

type OTPFormData = Pick<
  components["schemas"]["ChangePasswordVerifyOtpRequest"],
  "otp"
>;

export function ChangePasswordStep2() {
  const { clearAndPush } = useModalViews<ProfileNewViews>();
  const { otp } = useValidationSchemas();
  const { newPassword, setNewPassword } = useProfileStore();
  const email = useProfile((state) => state.profile.email);

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
      // TODO: API call to verify OTP and change password
      // await verifyOTPAndChangePassword(_data.otp, newPassword);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (newPassword) {
        // Password is stored on the server, we just confirm it was changed
        // The profile doesn't store the password itself
        setNewPassword(null);
      }

      form.reset();
      clearAndPush("profile");
    } catch {
      // Error handling
      form.reset();
    }
  };

  if (!newPassword) {
    return (
      <AdaptiveModalContent>
        <p className="text-foreground/50 text-sm">
          <Trans>
            No password provided. Please go back and enter a new password.
          </Trans>
        </p>
      </AdaptiveModalContent>
    );
  }

  return (
    <AdaptiveModalContent>
      <form
        className="mt-4 flex w-full flex-col items-center justify-center gap-4"
        id="change-password-step-2-form"
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
                        className="size-12 rounded-xl border-none text-2xl"
                        index={index}
                        // biome-ignore lint/suspicious/noArrayIndexKey: static index
                        key={index}
                      />
                    ))}
                  </InputOTP>

                  {fieldState.invalid && fieldState.error ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : null}
                </FieldContent>
              </Field>
            )}
          />
        </FieldGroup>

        <p className="mt-4 text-center text-foreground/50 text-sm">
          <Trans>
            Enter the 6-digit code we sent to your email address ({email}) to
            complete changing your password.
          </Trans>
        </p>

        <ResendOtpButton className="text-center" email={email || ""} />

        <Button
          className="group my-4 text-link"
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
      </form>
    </AdaptiveModalContent>
  );
}
