"use client";

import { Trans } from "@lingui/react/macro";
import { ChevronRightIcon, Image } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/ui/kit/primitives/button";
import { BentoBlockGalleryFileManagerModal } from "./modal";

export function BentoBlockGalleryFileManager() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button className="h-11" onClick={() => setOpen(!open)} size="sm">
        <Image className="size-4" />
        <Trans>Manage media</Trans>
        <ChevronRightIcon className="size-4" />
      </Button>

      <BentoBlockGalleryFileManagerModal
        onOpenChange={() => setOpen(!open)}
        open={open}
      />
    </>
  );
}
