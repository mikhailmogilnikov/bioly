import { AdaptiveModalContent } from "@/shared/ui/kit/overlays/adaptive-modal";
import { HeaderSettings } from "./header-settings";
import { MainSettings } from "./main-settings";

export function SettingsThemeView() {
  return (
    <AdaptiveModalContent>
      <div className="flex flex-col gap-6 py-1">
        <MainSettings />
        <HeaderSettings />
      </div>
    </AdaptiveModalContent>
  );
}
