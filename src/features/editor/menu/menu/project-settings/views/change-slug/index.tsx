import { Trans } from "@lingui/react/macro";
import { AdaptiveModalContent } from "@/shared/ui/kit/overlays/adaptive-modal";

export function SettingsChangeSlugView() {
  return (
    <AdaptiveModalContent>
      <div className="flex flex-col gap-6 py-1">
        <div className="flex items-center justify-between pr-1">
          <p className="font-medium text-base">
            <Trans>Change slug</Trans>
          </p>
        </div>
      </div>
    </AdaptiveModalContent>
  );
}
