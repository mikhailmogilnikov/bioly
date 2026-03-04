"use client";

import { Trans } from "@lingui/react/macro";
import {
  AdaptiveModal,
  AdaptiveModalContent,
  AdaptiveModalFooter,
  AdaptiveModalHeader,
} from "@/shared/ui/kit/overlays/adaptive-modal";
import { Button } from "@/shared/ui/kit/primitives/button";

export function BentoBlockGalleryFileManagerModal({
  onOpenChange,
  open,
}: {
  onOpenChange: () => void;
  open: boolean;
}) {
  return (
    <AdaptiveModal onOpenChange={onOpenChange} open={open}>
      <AdaptiveModalHeader>
        <Trans>Manage media</Trans>
      </AdaptiveModalHeader>
      <AdaptiveModalContent>content</AdaptiveModalContent>
      <AdaptiveModalFooter>
        <Button className="h-12 w-full shrink" variant="inverse">
          <Trans>Save</Trans>
        </Button>
      </AdaptiveModalFooter>
    </AdaptiveModal>
  );
}
