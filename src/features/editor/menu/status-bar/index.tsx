import { Trans } from "@lingui/react/macro";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/overlays/dropdown-menu";
import { Pulse } from "@/shared/ui/kit/primitives/pulse";

export function EditorMenuStatusBar() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="pressable size-12 cursor-pointer rounded-full border border-foreground/8 bg-default/50 pb-[4px] backdrop-blur-md">
        <Pulse color="success" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel>
          <Trans>Synchronization status</Trans>
        </DropdownMenuLabel>
        <div className="-mt-2 flex flex-col gap-3 p-2">
          <div className="flex items-center gap-2 pl-1">
            <Pulse color="success" />{" "}
            <p className="font-medium text-sm text-success">
              <Trans>Active</Trans>
            </p>
          </div>
          <p className="text-foreground/50 text-xs">
            <Trans>Last update:</Trans> {new Date().toLocaleString()}
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
