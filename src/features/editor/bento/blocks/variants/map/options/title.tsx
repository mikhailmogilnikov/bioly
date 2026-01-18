import { useLingui } from "@lingui/react/macro";
import type { ChangeEvent } from "react";
import { useBlockContext } from "@/features/editor/bento/grid/ui/block-context";
import { useProfile } from "@/features/editor/profile/use-profile";
import { Input } from "@/shared/ui/kit/primitives/input";
import { SectionTitle } from "@/shared/ui/kit/section-title";

export function BentoBlockMapTitle() {
  const { block } = useBlockContext<"map">();
  const { t } = useLingui();
  const updateBentoBlockField = useProfile(
    (state) => state.updateBentoBlockField
  );

  if (!block) return null;

  const { title } = block.properties;

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const title = e.target.value;

    updateBentoBlockField(block.id, "properties", {
      ...block.properties,
      title,
    });
  };

  return (
    <SectionTitle title={t`Map title`}>
      <Input
        className="h-10 rounded-full"
        maxLength={100}
        onChange={handleTitleChange}
        placeholder={t`Enter map title`}
        type="text"
        value={title}
      />
    </SectionTitle>
  );
}
