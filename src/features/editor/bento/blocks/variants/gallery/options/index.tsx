import { useProfile } from "@/features/editor/profile/use-profile";
import type { BentoBlockSize } from "../../../model/types";
import { BentoBlockDeleteSetting } from "../../../shared-settings/delete";
import { BentoBlockSizeSetting } from "../../../shared-settings/size";

type BentoBlockGalleryOptionsProps = {
  id: string;
  onSizeChange: (size: BentoBlockSize) => void;
  onDelete: () => void;
};

export function BentoBlockGalleryOptions({
  id,
  onSizeChange,
  onDelete,
}: BentoBlockGalleryOptionsProps) {
  const bento = useProfile((state) => state.profile.bento);

  const bentoItem = bento.find((item) => item.id === id);
  const size = bentoItem?.size;

  return (
    <>
      <BentoBlockSizeSetting
        activeSize={size}
        onSelect={onSizeChange}
        sizes={["2x2", "2x4", "4x2", "4x4"]}
      />
      <hr className="border-outline" />
      <BentoBlockDeleteSetting id={id} onDelete={onDelete} />
    </>
  );
}
