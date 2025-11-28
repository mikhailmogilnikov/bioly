import { Trans } from "@lingui/react/macro";

import {
  AdaptiveModal,
  AdaptiveModalContent,
  AdaptiveModalHeader,
} from "@/shared/ui/kit/overlays/adaptive-modal";
import { ChangeEmail } from "./change-email/change-email";
import { ChangePassword } from "./change-password/change-password";
import { ChangeSlug } from "./change-slug";
import { Logout } from "./logout";

type ProfileModalProps = {
  open: boolean;
  onOpenChange: () => void;
};

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  return (
    <AdaptiveModal onOpenChange={onOpenChange} open={open}>
      <AdaptiveModalHeader>
        <Trans>Profile</Trans>
      </AdaptiveModalHeader>
      <AdaptiveModalContent>
        <div className="flex flex-col gap-6 py-1">
          <ChangeSlug />
          <hr className="h-px border-outline" />
          <ChangeEmail />
          <ChangePassword />
          <Logout />
        </div>
      </AdaptiveModalContent>
    </AdaptiveModal>
  );
}
