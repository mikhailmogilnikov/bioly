import { useLingui } from "@lingui/react/macro";
import { type ChangeEvent, useEffect, useState } from "react";
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

  const [localTitle, setLocalTitle] = useState(block?.properties?.title ?? "");

  useEffect(() => {
    if (block?.properties?.title !== undefined) {
      setLocalTitle(block.properties?.title);
    }
  }, [block?.properties?.title]);

  if (!block) return null;

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setLocalTitle(newTitle);

    if (typeof block.properties?.title !== "string") return;

    updateBentoBlockField(block.id, "properties", {
      ...block.properties,
      title: newTitle,
    });
  };

  return (
    <SectionTitle title={t`Map title`}>
      <Input
        maxLength={100}
        onChange={handleTitleChange}
        placeholder={t`Enter map title`}
        type="text"
        value={localTitle}
      />
    </SectionTitle>
  );
}
