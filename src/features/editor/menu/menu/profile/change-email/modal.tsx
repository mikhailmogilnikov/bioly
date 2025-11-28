"use client";

import { Trans } from "@lingui/react/macro";
import { useState } from "react";

import {
  AdaptiveModal,
  AdaptiveModalContent,
  AdaptiveModalHeader,
} from "@/shared/ui/kit/overlays/adaptive-modal";

import { ChangeEmailStep1 } from "./step-1";
import { ChangeEmailStep2 } from "./step-2";

export type ChangeEmailStep = "1-email" | "2-otp";

export function ChangeEmailModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: () => void;
}) {
  const [step, setStep] = useState<ChangeEmailStep>("1-email");
  const [newEmail, setNewEmail] = useState<string>("");

  const handleSuccess = () => {
    setStep("1-email");
    setNewEmail("");
    onOpenChange();
  };

  const handleOpenChange = () => {
    if (!open) {
      setStep("1-email");
      setNewEmail("");
    }
    onOpenChange();
  };

  const steps = {
    "1-email": (
      <ChangeEmailStep1
        newEmail={newEmail}
        setNewEmail={setNewEmail}
        setStep={setStep}
      />
    ),
    "2-otp": (
      <ChangeEmailStep2
        newEmail={newEmail}
        onSuccess={handleSuccess}
        setStep={setStep}
      />
    ),
  };

  return (
    <AdaptiveModal onOpenChange={handleOpenChange} open={open}>
      <AdaptiveModalHeader>
        <Trans>Change Email</Trans>
      </AdaptiveModalHeader>
      <AdaptiveModalContent>
        <div className="px-1 pb-4">{steps[step]}</div>
      </AdaptiveModalContent>
    </AdaptiveModal>
  );
}
