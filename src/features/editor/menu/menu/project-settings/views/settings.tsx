import { Trans } from "@lingui/react/macro";
import { AdaptiveModalContent } from "@/shared/ui/kit/overlays/adaptive-modal";
import { BorderSlider } from "../border-slider";
import { FontSelector } from "../font-selector";
import { RoundSlider } from "../round-slider";
import { ThemeSelector } from "../theme-selector";

export function SettingsView() {
  return (
    <AdaptiveModalContent>
      <div className="flex flex-col gap-6 py-1">
        <div className="flex items-center justify-between pr-1">
          <p className="font-medium text-base">
            <Trans>Theme</Trans>
          </p>
          <ThemeSelector />
        </div>
        <div className="flex items-center justify-between pr-1">
          <p className="font-medium text-base">
            <Trans>Font</Trans>
          </p>
          <FontSelector />
        </div>
        <RoundSlider />
        <BorderSlider />
      </div>
    </AdaptiveModalContent>
  );
}
