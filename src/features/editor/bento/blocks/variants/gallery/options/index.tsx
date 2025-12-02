import { useBlockContext } from "@/features/editor/bento/grid/ui/block-context";
import { BentoBlockDeleteSetting } from "../../../shared-settings/delete";
import { BentoBlockSizeSetting } from "../../../shared-settings/size";

export function BentoBlockGalleryOptions() {
  const { block } = useBlockContext();

  if (!block) return null;

  return (
    <>
      <BentoBlockSizeSetting sizes={["2x2", "2x4", "4x2", "4x4"]} />
      <hr className="border-outline" />
      <BentoBlockDeleteSetting />
    </>
  );
}
