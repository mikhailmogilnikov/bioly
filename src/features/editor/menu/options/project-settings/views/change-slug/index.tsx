"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trans, useLingui } from "@lingui/react/macro";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useProfile } from "@/features/editor/profile/use-profile";
import { useValidationSchemas } from "@/shared/lib/hooks/use-validation";
import { useModalViews } from "@/shared/lib/providers/modal-views/modal-views-provider";
import { CONFIG } from "@/shared/model/config";
import { AdaptiveModalContent } from "@/shared/ui/kit/overlays/adaptive-modal";
import { Button } from "@/shared/ui/kit/primitives/button";
import { FieldDescription, FieldError } from "@/shared/ui/kit/primitives/field";
import type { ProjectSettingsViews } from "../..";

interface ChangeSlugFormData {
  slug: string;
}

export function SettingsChangeSlugView() {
  const { t } = useLingui();
  const { slug } = useValidationSchemas();
  const currentSlug = useProfile((state) => state.profile.slug);
  const updateProfile = useProfile((state) => state.updateProfile);
  const { clearAndPush } = useModalViews<ProjectSettingsViews>();

  const form = useForm<ChangeSlugFormData>({
    resolver: zodResolver(z.object({ slug })),
    defaultValues: {
      slug: currentSlug,
    },
  });

  const { register, formState } = form;

  const onSubmit = (data: ChangeSlugFormData) => {
    if (data.slug === currentSlug) {
      form.setError("slug", {
        message: t`New slug must be different from current slug`,
      });
      return;
    }

    updateProfile({ slug: data.slug });
    clearAndPush("settings");
  };

  return (
    <AdaptiveModalContent>
      <form
        className="flex w-full flex-col items-stretch gap-6 py-1"
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

        {formState.errors.slug ? (
          <FieldError
            className="-mt-4 text-start"
            errors={[formState.errors.slug]}
          />
        ) : null}

        <FieldDescription className="text-foreground/50 text-sm">
          <Trans>
            The slug is the part of the URL that appears after the domain name.
            Can be changed only once in 7 days.
          </Trans>
        </FieldDescription>

        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          variant="inverse"
        >
          {form.formState.isSubmitting ? (
            <Trans>Saving...</Trans>
          ) : (
            <Trans>Save</Trans>
          )}
        </Button>
      </form>
    </AdaptiveModalContent>
  );
}
