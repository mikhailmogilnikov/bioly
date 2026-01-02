import { useLingui } from "@lingui/react/macro";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useMemo } from "react";
import z from "zod";

const SLUG_REGEX = /^[a-z0-9_-]+$/;
const PASSWORD_UPPERCASE_REGEX = /[A-Z]/;
const PASSWORD_LOWERCASE_REGEX = /[a-z]/;
const PASSWORD_NUMBER_REGEX = /[0-9]/;

export const useValidationSchemas = () => {
  const { t } = useLingui();

  const schemas = useMemo(() => {
    const otp = z
      .string()
      .length(6, t`Verification code must be 6 digits`)
      .regex(new RegExp(REGEXP_ONLY_DIGITS), t`Only digits are allowed`);

    const slug = z
      .string()
      .min(1, t`Enter username`)
      .min(3, t`Username must be at least 3 characters`)
      .max(30, t`Username must be no more than 30 characters`)
      .regex(
        SLUG_REGEX,
        t`Username can only contain lowercase Latin letters, numbers, hyphens, and underscores`
      )
      .refine(
        (val) => !(val.startsWith("-") || val.startsWith("_")),
        t`Username cannot start with a hyphen or underscore`
      )
      .refine(
        (val) => !(val.endsWith("-") || val.endsWith("_")),
        t`Username cannot end with a hyphen or underscore`
      );

    const email = z.email(t`Invalid email address`).min(1, t`Enter your email`);

    const newEmail = z
      .email(t`Invalid email address`)
      .min(1, t`Enter new email`);

    const url = z.url(t`Invalid URL`);

    const password = z
      .string()
      .min(8, t`Password must contain at least 8 characters`)
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
      );

    const oldPassword = z.string().min(1, t`Enter current password`);

    const confirmPassword = z.string().min(1, t`Confirm new password`);

    const passwordSchema = z
      .object({
        oldPassword,
        newPassword: password,
        confirmPassword,
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
      otp,
    });

    return {
      // Individual field schemas
      otp,
      slug,
      email,
      newEmail,
      url,
      password,
      oldPassword,
      confirmPassword,
      // Composite schemas
      passwordSchema,
      otpSchema,
    };
  }, [t]);

  return schemas;
};
