import { useBlockContext } from "@/features/editor/bento/grid/ui/block-context";
import type { BentoBlock, BentoBlockType } from "../../../model/types";
import { BentoBlockDeleteSetting } from "../../../shared-settings/delete";
import { BentoBlockSizeSetting } from "../../../shared-settings/size";
import { BentoBlockLinkSettingEnterTitle } from "./enter-title";
import { BentoBlockLinkSettingEnterUrl } from "./enter-url";

export function BentoBlockLinkOptions() {
  const { block } = useBlockContext();
  const linkBlock = block as BentoBlock<typeof BentoBlockType.LINK>;

  if (!linkBlock) return null;

  return (
    <>
      <BentoBlockSizeSetting sizes={["4x1", "2x2", "2x4", "4x2", "4x4"]} />
      <hr className="border-outline" />
      <BentoBlockLinkSettingEnterUrl />

      {linkBlock.properties.url_valid && <BentoBlockLinkSettingEnterTitle />}
      <hr className="border-outline" />
      <BentoBlockDeleteSetting />
    </>
  );
}
