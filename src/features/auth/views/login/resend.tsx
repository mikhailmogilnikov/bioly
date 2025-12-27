import { Trans } from "@lingui/react/macro";
import {
  useHandleTimers,
  useTimers,
} from "@/shared/lib/hooks/use-handle-timers";
import { useAuthContext } from "../../model/provider";

export function LoginResendButton() {
  const { email } = useAuthContext();

  const duration = useTimers((state) => state.timers.otp?.[email || ""]);

  const { startTimer } = useHandleTimers();

  const handleResend = () => {
    if (!email) return;

    startTimer({ key: "otp", id: email, duration: 60 });
  };

  return (
    <p className="mt-4 font-medium text-foreground/50 text-sm">
      <Trans>
        Didn't receive the code?{" "}
        {duration > 0 ? (
          <span className="font-medium text-foreground/50">
            Resend in {duration} seconds
          </span>
        ) : (
          <button
            className="font-medium text-foreground"
            onClick={handleResend}
            type="button"
          >
            Resend
          </button>
        )}
      </Trans>
    </p>
  );
}
