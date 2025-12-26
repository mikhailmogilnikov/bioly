import { Trans } from "@lingui/react/macro";
import { GoogleIcon } from "@/shared/assets/icons/google";
import { Button } from "@/shared/ui/kit/primitives/button";
import { LocalizedLink } from "@/shared/ui/utils/localized-link";
import { EnterEmailForm } from "./enter-email-form";

export function EnterEmailScreen() {
  return (
    <div className="flex w-full flex-col items-stretch gap-8">
      <Button>
        <GoogleIcon />
        <Trans>Continue with Google</Trans>
      </Button>

      <hr className="border-foreground/10" />

      <EnterEmailForm />

      <p className="-mt-4 text-center text-foreground/50 text-xs">
        <Trans>
          By continuing, you agree to our{" "}
          <LocalizedLink className="font-medium underline" href="/">
            Terms of Service
          </LocalizedLink>{" "}
          and{" "}
          <LocalizedLink className="font-medium underline" href="/">
            Privacy Policy
          </LocalizedLink>
          .
        </Trans>
      </p>
    </div>
  );
}
