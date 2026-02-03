import { ModalViewsProvider } from "@/shared/lib/providers/modal-views/modal-views-provider";
import { AdaptiveModal } from "@/shared/ui/kit/overlays/adaptive-modal";
import { ProfileNewController } from "./controller";

interface ProfileModalNewProps {
  open: boolean;
  onOpenChange: () => void;
}

export type ProfileNewViews =
  | "profile"
  | "change-email-step-1"
  | "change-email-step-2"
  | "change-password-step-1"
  | "change-password-step-2"
  | "add-password-step-1"
  | "add-password-step-2";

export function ProfileModalNew({ open, onOpenChange }: ProfileModalNewProps) {
  return (
    <AdaptiveModal onOpenChange={onOpenChange} open={open}>
      <ModalViewsProvider<ProfileNewViews> initialView="profile">
        <ProfileNewController />
      </ModalViewsProvider>
    </AdaptiveModal>
  );
}
