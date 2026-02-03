import { useBlockContext } from "@/features/editor/bento/grid/ui/block-context";
import { BentoBlockDeleteSetting } from "../../../shared-settings/delete";
import { BentoBlockSizeSetting } from "../../../shared-settings/size";
import { BentoBlockLinkSettingEnterTitle } from "./enter-title";
import { BentoBlockLinkSettingEnterUrl } from "./enter-url";

export function BentoBlockLinkOptions() {
  const { block } = useBlockContext<"link">();

  if (!block) return null;

  return (
    <>
      <BentoBlockSizeSetting sizes={["4x1", "2x2", "2x4", "4x2", "4x4"]} />
      <hr className="border-outline" />
      <BentoBlockLinkSettingEnterUrl />

      {block.properties?.url_valid ? <BentoBlockLinkSettingEnterTitle /> : null}
      <hr className="border-outline" />
      <BentoBlockDeleteSetting />
    </>
  );
}
