"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trans } from "@lingui/react/macro";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { components } from "@/shared/api/schema/generated";
import { useValidationSchemas } from "@/shared/lib/hooks/use-validation";
import { CONFIG } from "@/shared/model/config";
import { Button } from "@/shared/ui/kit/primitives/button";
import { FieldError } from "@/shared/ui/kit/primitives/field";
import { BackButton } from "../../back-button";
import { useAuthContext } from "../../model/provider";

type SlugFormData = Pick<
  components["schemas"]["SignupEnterSlugRequest"],
  "slug"
>;

export function EnterSlugScreen() {
  const { navigateToScreen } = useAuthContext();
  const { slug } = useValidationSchemas();

  const slugSchema = z.object({
    slug,
  });

  const form = useForm<SlugFormData>({
    resolver: zodResolver(slugSchema),
    defaultValues: {
      slug: "",
    },
  });

  const { register, formState } = form;

  const onSubmit = async (_data: SlugFormData) => {
    try {
      // TODO: API call to check slug availability and create account

      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigateToScreen("signup-verify-otp");
    } catch {
      // Error handling
    }
  };

  return (
    <form
      className="flex w-full flex-col items-stretch gap-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="squircle flex p-4 font-medium text-lg">
        <p className="text-foreground/70">{CONFIG.domain}/</p>
        <input
          {...register("slug")}
          aria-invalid={formState.errors.slug ? "true" : "false"}
          autoFocus
          className="w-full outline-none"
          placeholder="username"
          type="text"
        />
      </div>

      {formState.errors.slug && (
        <FieldError
          className="-mt-4 text-start"
          errors={[formState.errors.slug]}
        />
      )}

      <Button
        disabled={form.formState.isSubmitting}
        type="submit"
        variant="link"
      >
        {form.formState.isSubmitting ? (
          <Trans>Creating account...</Trans>
        ) : (
          <Trans>Continue</Trans>
        )}
      </Button>

      <BackButton
        className="mx-auto w-fit"
        onClick={() => navigateToScreen("enter-email")}
      >
        <Trans>Back to enter email</Trans>
      </BackButton>
    </form>
  );
}
