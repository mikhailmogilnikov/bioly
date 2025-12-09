import { Trans } from "@lingui/react/macro";
import { Save } from "lucide-react";
import { buildUrl } from "@/shared/lib/utils/build-url";
import { saveElementAsImage } from "@/shared/lib/utils/save-image";
import { CONFIG } from "@/shared/model/config";
import {
  AdaptiveModal,
  AdaptiveModalContent,
  AdaptiveModalHeader,
} from "@/shared/ui/kit/overlays/adaptive-modal";
import { useProfile } from "../../profile/use-profile";
import { CopyButton } from "./copy-button";
import { QrCard } from "./qr-card";

export function ShareModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: () => void;
}) {
  const { slug } = useProfile(
    (state) => ({
      slug: state.profile.slug,
    }),
    "shallow"
  );

  const handleSaveImage = async () => {
    try {
      await saveElementAsImage("qr-root", `${CONFIG.title}-invite.jpg`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to save image:", error);
    }
  };

  return (
    <AdaptiveModal onOpenChange={onOpenChange} open={open}>
      <AdaptiveModalHeader>
        <Trans>Share my profile</Trans>
      </AdaptiveModalHeader>
      <AdaptiveModalContent>
        <div className="mt-1 box-border flex flex-col items-center gap-4">
          <QrCard />
        </div>
        <div className="mt-8 flex flex-col items-center gap-4">
          <button
            className="pressable flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3 font-medium text-background"
            onClick={handleSaveImage}
            type="button"
          >
            <Save className="size-4" /> <Trans>Save QR image</Trans>
          </button>
          <CopyButton
            className="pressable flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-default px-4 py-3 font-medium"
            iconClassName="size-4"
            text={buildUrl(slug)}
          >
            <Trans>Copy profile URL</Trans>
          </CopyButton>
        </div>
      </AdaptiveModalContent>
    </AdaptiveModal>
  );
}
