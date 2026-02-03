import { useLingui } from "@lingui/react/macro";
import { CheckCircle, XCircle } from "lucide-react";
import type { ChangeEvent } from "react";
import z from "zod";
import { useBlockContext } from "@/features/editor/bento/grid/ui/block-context";
import { useProfile } from "@/features/editor/profile/use-profile";
import { useValidationSchemas } from "@/shared/lib/hooks/use-validation";
import { SectionTitle } from "@/shared/ui/kit/section-title";

export function BentoBlockLinkSettingEnterUrl() {
  const { block } = useBlockContext<"link">();
  const { t } = useLingui();
  const { url: urlSchema } = useValidationSchemas();
  const updateBentoBlockField = useProfile(
    (state) => state.updateBentoBlockField
  );

  if (!block) return null;

  const schema = z.object({
    url: urlSchema,
  });

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const url = e.target.value;

    if (url.length > 100) return;
    const validatedUrl = schema.safeParse({ url });

    if (typeof block.properties?.url !== "string") return;

    updateBentoBlockField(block.id, "properties", {
      ...block.properties,
      url,
      url_valid: validatedUrl.success,
    });
  };

  return (
    <SectionTitle
      className="gap-1"
      sideContent={
        block.properties?.url_valid ? (
          <CheckCircle className="size-4 text-success" />
        ) : (
          <XCircle className="size-4 text-danger" />
        )
      }
      title="URL"
    >
      <input
        className="w-full rounded-full bg-foreground/10 px-4 py-2 outline-none"
        onChange={handleUrlChange}
        placeholder={t`Enter URL`}
        type="text"
        value={block.properties?.url ?? ""}
      />
    </SectionTitle>
  );
}
