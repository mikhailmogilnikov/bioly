import { useLingui } from "@lingui/react/macro";
import type { ChangeEvent } from "react";
import { useBlockContext } from "@/features/editor/bento/grid/ui/block-context";
import { useProfile } from "@/features/editor/profile/use-profile";
import { SectionTitle } from "@/shared/ui/kit/section-title";
import type { BentoBlock } from "../../../model/types";

export function BentoBlockLinkSettingEnterTitle() {
  const { block } = useBlockContext();
  const { t } = useLingui();
  const updateBentoBlockField = useProfile(
    (state) => state.updateBentoBlockField
  );

  const linkBlock = block as BentoBlock<"link">;

  if (!linkBlock) return null;

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const title = e.target.value;

    if (typeof linkBlock.properties?.title !== "string") return;

    updateBentoBlockField(linkBlock.id, "properties", {
      ...linkBlock.properties,
      title,
    });
  };

  return (
    <SectionTitle className="gap-1" title={t`Title`}>
      <input
        className="w-full rounded-full bg-foreground/10 px-4 py-2 outline-none"
        onChange={handleTitleChange}
        placeholder={t`Enter Title`}
        type="text"
        value={linkBlock.properties?.title ?? ""}
      />
    </SectionTitle>
  );
}
