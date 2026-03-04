import { useBlockContext } from "@/features/editor/bento/grid/ui/block-context";
import { Separator } from "@/shared/ui/kit/primitives/separator";
import { BentoBlockDeleteSetting } from "../../../shared-settings/delete";
import { BentoBlockSizeSetting } from "../../../shared-settings/size";
import { BentoBlockGalleryFileManager } from "./file-manager";

export function BentoBlockGalleryOptions() {
  const { block } = useBlockContext<"gallery">();

  if (!block) return null;

  return (
    <>
      <BentoBlockSizeSetting sizes={["2x2", "2x4", "4x2", "4x4"]} />
      <Separator />
      <BentoBlockGalleryFileManager />
      <Separator />
      <BentoBlockDeleteSetting />
    </>
  );
}
