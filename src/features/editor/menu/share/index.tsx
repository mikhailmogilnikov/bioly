import { Trans } from "@lingui/react/macro";
import { ScanQrCode } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui/kit/overlays/react-tooltip";
import { ShareModal } from "./modal";

export function EditBarShare() {
  const [open, setOpen] = useState(false);

  const handleOpenChange = () => {
    setOpen(!open);
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger
          className="pressable flex size-12 cursor-pointer items-center justify-center rounded-full border border-foreground/8 bg-default/50 backdrop-blur-md"
          onClick={() => setOpen(true)}
        >
          <ScanQrCode className="size-6" />
        </TooltipTrigger>
        <TooltipContent>
          <p>
            <Trans>Share</Trans>
          </p>
        </TooltipContent>
      </Tooltip>
      <ShareModal onOpenChange={handleOpenChange} open={open} />
    </>
  );
}
