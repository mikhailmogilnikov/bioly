import { AdaptiveModalContent } from "@/shared/ui/kit/overlays/adaptive-modal";
import { HeaderSettings } from "./header-settings";

export function ThemeHeaderView() {
  return (
    <AdaptiveModalContent>
      <div className="flex flex-col gap-6 py-1">
        <HeaderSettings />
      </div>
    </AdaptiveModalContent>
  );
}
