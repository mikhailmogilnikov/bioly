import { BentoBlockDeleteSetting } from "../../../shared-settings/delete";
import { BentoBlockSizeSetting } from "../../../shared-settings/size";
import { BentoBlockMapInteractions } from "./interactions";
import { BentoBlockMapLabels } from "./labels";
import { BentoBlockMapTheme } from "./theme";
import { BentoBlockMapZoom } from "./zoom";

export function BentoBlockMapOptions() {
  return (
    <>
      <BentoBlockSizeSetting sizes={["2x2", "2x4", "4x2", "4x4"]} />
      <hr className="border-outline" />
      <BentoBlockMapZoom className="mb-2" />
      <BentoBlockMapTheme />
      <hr className="border-outline" />
      <BentoBlockMapLabels />
      <BentoBlockMapInteractions />
      <hr className="border-outline" />
      <BentoBlockDeleteSetting />
    </>
  );
}
