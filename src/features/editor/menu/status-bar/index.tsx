import { Trans, useLingui } from "@lingui/react/macro";
import { ArrowUpRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { buildUrl } from "@/shared/lib/utils/build-url";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/overlays/dropdown-menu";
import { Button } from "@/shared/ui/kit/primitives/button";
import { Pulse } from "@/shared/ui/kit/primitives/pulse";
import { useProfile } from "../../profile/use-profile";

export function EditorMenuStatusBar() {
  const { t } = useLingui();
  const slug = useProfile((state) => state.profile.slug);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="pressable flex size-12 cursor-pointer items-center justify-center rounded-full border border-foreground/8 bg-default/50 backdrop-blur-md">
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
            <Trans>Last synchronization:</Trans> {new Date().toLocaleString()}
          </p>
          <Button
            asChild
            className="bg-link/15 text-link hover:bg-link/20"
            size="default"
          >
            <Link
              aria-label={t`Go to live page`}
              href={buildUrl(slug) as Route}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Trans>View my page</Trans>
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
