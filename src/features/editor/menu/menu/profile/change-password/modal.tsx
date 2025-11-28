import { Trans } from "@lingui/react/macro";
import { useState } from "react";

import {
  AdaptiveModal,
  AdaptiveModalContent,
  AdaptiveModalHeader,
} from "@/shared/ui/kit/overlays/adaptive-modal";

import { ChangePasswordStep1 } from "./step-1";
import { ChangePasswordStep2 } from "./step-2";

export type ChangePasswordStep = "1-password" | "2-otp";

export function ChangePasswordModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: () => void;
}) {
  const [step, setStep] = useState<ChangePasswordStep>("1-password");
  const [passwordData, setPasswordData] = useState<{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSuccess = () => {
    setStep("1-password");
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    onOpenChange();
  };

  const handleOpenChange = () => {
    if (!open) {
      setStep("1-password");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
    onOpenChange();
  };

  const steps = {
    "1-password": (
      <ChangePasswordStep1
        passwordData={passwordData}
        setPasswordData={setPasswordData}
        setStep={setStep}
      />
    ),
    "2-otp": (
      <ChangePasswordStep2 onSuccess={handleSuccess} setStep={setStep} />
    ),
  };

  return (
    <AdaptiveModal onOpenChange={handleOpenChange} open={open}>
      <AdaptiveModalHeader>
        <Trans>Change Password</Trans>
      </AdaptiveModalHeader>
      <AdaptiveModalContent>
        <div className="px-1 pb-4">{steps[step]}</div>
      </AdaptiveModalContent>
    </AdaptiveModal>
  );
}
