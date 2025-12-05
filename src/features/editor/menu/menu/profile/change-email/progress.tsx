import { useLingui } from "@lingui/react/macro";

import { Progress } from "@/shared/ui/kit/primitives/progress";

import type { ChangeEmailStep } from "./modal";

export function ChangeEmailProgress({ step }: { step: ChangeEmailStep }) {
  const { t } = useLingui();

  const steps = {
    "0-current-otp": {
      label: t`Verify current email`,
      progress: 33,
    },
    "1-email": {
      label: t`Enter new email`,
      progress: 66,
    },
    "2-otp": {
      label: t`Verify new email`,
      progress: 100,
    },
  };

  const stepIndex = Object.keys(steps).indexOf(step);
  const totalSteps = Object.keys(steps).length;

  return (
    <div className="flex w-full flex-col items-start justify-start gap-3">
      <div className="flex w-full items-center justify-between gap-2">
        <p className="font-medium text-base">{steps[step].label}</p>
        <p className="font-medium text-base opacity-50">
          {stepIndex + 1} / {totalSteps}
        </p>
      </div>
      <Progress
        className="w-full bg-default"
        indicatorClassName="bg-foreground"
        value={steps[step].progress}
      />
    </div>
  );
}
