import { useLingui } from "@lingui/react/macro";
import { Pencil } from "lucide-react";
import { useState } from "react";

import { SectionTitle } from "@/shared/ui/kit/section-title";

import { ChangeEmailModal } from "./modal";

export function ChangeEmail() {
  const { t } = useLingui();
  const [open, setOpen] = useState(false);

  return (
    <>
      <SectionTitle title={t`Email`}>
        <div className="squircle-outline flex items-center justify-between p-4">
          <p className="font-medium text-base">mike@bioly.me</p>

          <button
            className="pressable rounded-full bg-default p-2 font-medium text-base"
            onClick={() => setOpen(true)}
            type="button"
          >
            <Pencil className="size-5" />
          </button>
        </div>
      </SectionTitle>
      <ChangeEmailModal onOpenChange={() => setOpen(!open)} open={open} />
    </>
  );
}
