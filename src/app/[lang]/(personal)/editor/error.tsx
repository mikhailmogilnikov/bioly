"use client";

import { Trans } from "@lingui/react/macro";
import { RefreshCcwIcon } from "lucide-react";
import { Button } from "@/shared/ui/kit/primitives/button";

export default function EditorErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-3 px-4 text-center">
        <h1 className="font-bold text-2xl">
          <Trans>Oops! Something went wrong.</Trans>
        </h1>
        <p className="max-w-sm text-foreground/50 text-sm">
          <Trans>
            We're sorry, but an error occurred while loading this page. If the
            problem persists, please contact support.
          </Trans>
        </p>

        <Button className="mt-2" onClick={() => reset()} size="sm">
          <RefreshCcwIcon className="size-4" />
          <Trans>Reload</Trans>
        </Button>
      </div>
    </div>
  );
}
