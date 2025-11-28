import { Trans } from "@lingui/react/macro";
import { KeyRound } from "lucide-react";
import { useState } from "react";

import { ChangePasswordModal } from "./modal";

export function ChangePassword() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="squircle pressable flex items-center justify-center gap-2 bg-default px-4 py-3 font-medium"
        onClick={() => setOpen(true)}
        type="button"
      >
        <KeyRound className="size-4" />
        <Trans>Change password</Trans>
      </button>
      <ChangePasswordModal onOpenChange={() => setOpen(!open)} open={open} />
    </>
  );
}
