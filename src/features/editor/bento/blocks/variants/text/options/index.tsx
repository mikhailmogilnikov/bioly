import { useProfile } from "@/features/editor/profile/use-profile";
import type { BentoBlock, BentoBlockType } from "../../../model/types";

import { BentoBlockDeleteSetting } from "../../../shared-settings/delete";

type BentoBlockTextOptionsProps = {
  id: string;
  onDelete: () => void;
};

export function BentoBlockTextOptions({
  id,
  onDelete,
}: BentoBlockTextOptionsProps) {
  const { bento } = useProfile(
    (state) => ({
      bento: state.profile.bento,
    }),
    "shallow"
  );

  const bentoItem = bento.find((item) => item.id === id) as BentoBlock<
    typeof BentoBlockType.TEXT
  >;

  if (!bentoItem) return null;

  return <BentoBlockDeleteSetting id={id} onDelete={onDelete} />;
}
