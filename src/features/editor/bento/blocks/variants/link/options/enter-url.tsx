import { useLingui } from "@lingui/react/macro";
import { CheckCircle, XCircle } from "lucide-react";
import type { ChangeEvent } from "react";
import z from "zod";
import { useBlockContext } from "@/features/editor/bento/grid/ui/block-context";
import { useProfile } from "@/features/editor/profile/use-profile";
import { SectionTitle } from "@/shared/ui/kit/section-title";
import type { BentoBlock, BentoBlockType } from "../../../model/types";

const schema = z.object({
  url: z.url(),
});

export function BentoBlockLinkSettingEnterUrl() {
  const { block } = useBlockContext();
  const { t } = useLingui();
  const updateBentoBlockField = useProfile(
    (state) => state.updateBentoBlockField
  );

  const linkBlock = block as BentoBlock<typeof BentoBlockType.LINK>;

  if (!linkBlock) return null;

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const url = e.target.value;

    if (url.length > 100) return;
    const validatedUrl = schema.safeParse({ url });

    updateBentoBlockField(linkBlock.id, "properties", {
      ...linkBlock.properties,
      url,
      url_valid: validatedUrl.success,
    });
  };

  return (
    <SectionTitle
      className="gap-1"
      sideContent={
        linkBlock.properties.url_valid ? (
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
        value={linkBlock.properties.url}
      />
    </SectionTitle>
  );
}
