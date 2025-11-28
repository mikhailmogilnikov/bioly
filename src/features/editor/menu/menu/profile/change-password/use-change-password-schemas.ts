import { useLingui } from "@lingui/react/macro";
import { z } from "zod";

const PASSWORD_UPPERCASE_REGEX = /[A-Z]/;
const PASSWORD_LOWERCASE_REGEX = /[a-z]/;
const PASSWORD_NUMBER_REGEX = /[0-9]/;
const OTP_DIGITS_REGEX = /^\d+$/;

export function useChangePasswordSchemas() {
  const { t } = useLingui();

  const passwordSchema = z
    .object({
      oldPassword: z.string().min(1, t`Enter current password`),
      newPassword: z
        .string()
        .min(8, t`New password must contain at least 8 characters`)
        .regex(
          PASSWORD_UPPERCASE_REGEX,
          t`Password must contain at least one uppercase letter`
        )
        .regex(
          PASSWORD_LOWERCASE_REGEX,
          t`Password must contain at least one lowercase letter`
        )
        .regex(
          PASSWORD_NUMBER_REGEX,
          t`Password must contain at least one number`
        ),
      confirmPassword: z.string().min(1, t`Confirm new password`),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t`Passwords do not match`,
      path: ["confirmPassword"],
    })
    .refine((data) => data.oldPassword !== data.newPassword, {
      message: t`New password must be different from old password`,
      path: ["newPassword"],
    });

  const otpSchema = z.object({
    otp: z
      .string()
      .length(6, t`Verification code must be 6 digits`)
      .regex(OTP_DIGITS_REGEX, t`Only digits are allowed`),
  });

  return {
    passwordSchema,
    otpSchema,
  };
}
