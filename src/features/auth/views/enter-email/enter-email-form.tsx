"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trans, useLingui } from "@lingui/react/macro";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/shared/ui/kit/primitives/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/ui/kit/primitives/field";
import { Input } from "@/shared/ui/kit/primitives/input";
import { useAuthContext } from "../../model/provider";

interface LoginFormData {
  email: string;
}

export function EnterEmailForm() {
  const { t } = useLingui();
  const { navigateToScreen, setEmail, email } = useAuthContext();

  const emailSchema = z.object({
    email: z.email(t`Invalid email address`).min(1, t`Enter your email`),
  });

  const form = useForm<LoginFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: email || "",
    },
  });

  const onSubmit = async (_data: LoginFormData) => {
    try {
      // TODO: API call to login
      // await login(_data.email);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEmail(_data.email);
      navigateToScreen("login-verify-otp");
    } catch {
      // Error handling
    }
  };

  return (
    <form
      className="flex w-full flex-col gap-4"
      id="login-form"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="login-email">
                  <Trans>Email</Trans>
                </FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoComplete="email"
                  className="border-0 focus-visible:ring-link/30"
                  id="login-email"
                  placeholder={t`Enter your email`}
                  type="email"
                />
                {fieldState.invalid && (
                  <FieldError
                    className="text-start"
                    errors={[fieldState.error]}
                  />
                )}
              </FieldContent>
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        disabled={form.formState.isSubmitting}
        type="submit"
        variant="link"
      >
        {form.formState.isSubmitting ? (
          <Trans>Signing in...</Trans>
        ) : (
          <Trans>Continue</Trans>
        )}
      </Button>
    </form>
  );
}
