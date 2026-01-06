import { Plural, Trans } from "@lingui/react/macro";
import {
  useHandleTimers,
  useTimers,
} from "@/shared/lib/hooks/use-handle-timers";
import { cn } from "@/shared/lib/utils";

export function ResendOtpButton({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  const duration = useTimers((state) => state.timers.otp?.[email]);

  const { startTimer } = useHandleTimers();

  const handleResend = () => {
    if (!email) return;

    startTimer({ key: "otp", id: email, duration: 60 });
  };

  return (
    <p className={cn("mt-4 font-medium text-foreground/50 text-sm", className)}>
      <Trans>Didn't receive the code?</Trans>{" "}
      {duration > 0 ? (
        <span className="font-medium text-foreground/50">
          <Trans>Resend in {duration}</Trans>{" "}
          <Plural
            few="seconds"
            many="seconds"
            one="second"
            other="seconds"
            value={duration}
          />
        </span>
      ) : (
        <button
          className="font-medium text-foreground"
          onClick={handleResend}
          type="button"
        >
          <Trans>Resend</Trans>
        </button>
      )}
    </p>
  );
}
