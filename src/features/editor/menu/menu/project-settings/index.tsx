import { Trans } from "@lingui/react/macro";
import {
  AdaptiveModal,
  AdaptiveModalContent,
  AdaptiveModalHeader,
} from "@/shared/ui/kit/overlays/adaptive-modal";
import { BorderSlider } from "./border-slider";
import { FontSelector } from "./font-selector";
import { RoundSlider } from "./round-slider";
import { ThemeSelector } from "./theme-selector";

interface ProjectSettingsProps {
  open: boolean;
  onOpenChange: () => void;
}

export function ProjectSettingsModal({
  open,
  onOpenChange,
}: ProjectSettingsProps) {
  return (
    <AdaptiveModal onOpenChange={onOpenChange} open={open}>
      <AdaptiveModalHeader>
        <Trans>Project settings</Trans>
      </AdaptiveModalHeader>
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
    </AdaptiveModal>
  );
}
