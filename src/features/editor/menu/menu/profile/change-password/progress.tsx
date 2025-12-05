import { useLingui } from "@lingui/react/macro";

import { Progress } from "@/shared/ui/kit/primitives/progress";

import type { ChangePasswordStep } from "./modal";

export function ChangePasswordProgress({ step }: { step: ChangePasswordStep }) {
  const { t } = useLingui();

  const steps = {
    "1-password": {
      label: t`Enter passwords`,
      progress: 50,
    },
    "2-otp": {
      label: t`Verify code`,
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
