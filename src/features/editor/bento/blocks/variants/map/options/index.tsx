import { BentoBlockDeleteSetting } from "../../../shared-settings/delete";
import { BentoBlockSizeSetting } from "../../../shared-settings/size";
import { BentoBlockMapTheme } from "./theme";

export function BentoBlockMapOptions() {
  return (
    <>
      <BentoBlockSizeSetting sizes={["2x2", "2x4", "4x2", "4x4"]} />
      <hr className="border-outline" />
      <BentoBlockMapTheme />
      <hr className="border-outline" />
      <BentoBlockDeleteSetting />
    </>
  );
}
