"use client";

import { Trans } from "@lingui/react/macro";
import { useEffect, useState } from "react";

import {
  AdaptiveModal,
  AdaptiveModalContent,
  AdaptiveModalHeader,
} from "@/shared/ui/kit/overlays/adaptive-modal";

import { ChangeEmailProgress } from "./progress";
import { ChangeEmailStep0 } from "./step-0";
import { ChangeEmailStep1 } from "./step-1";
import { ChangeEmailStep2 } from "./step-2";

export type ChangeEmailStep = "0-current-otp" | "1-email" | "2-otp";

export function ChangeEmailModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: () => void;
}) {
  const [step, setStep] = useState<ChangeEmailStep>("0-current-otp");
  const [newEmail, setNewEmail] = useState<string>("");

  useEffect(() => {
    if (!open) {
      setStep("0-current-otp");
      setNewEmail("");
    }
  }, [open]);

  const handleSuccess = () => {
    setStep("0-current-otp");
    setNewEmail("");
    onOpenChange();
  };

  const steps = {
    "0-current-otp": <ChangeEmailStep0 setStep={setStep} />,
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
    <AdaptiveModal onOpenChange={onOpenChange} open={open}>
      <AdaptiveModalHeader>
        <Trans>Change Email</Trans>
      </AdaptiveModalHeader>
      <AdaptiveModalContent>
        <div className="px-1 pb-4">
          <div className="mb-6">
            <ChangeEmailProgress step={step} />
          </div>
          {steps[step]}
        </div>
      </AdaptiveModalContent>
    </AdaptiveModal>
  );
}
