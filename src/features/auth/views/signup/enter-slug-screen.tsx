import { Trans } from "@lingui/react/macro";
import { BackButton } from "../../back-button";
import { useAuthContext } from "../../model/provider";

export function EnterSlugScreen() {
  const { navigateToScreen } = useAuthContext();

  return (
    <div className="flex w-full flex-col items-stretch gap-8">
      EnterSlugScreen
      <BackButton
        className="mx-auto w-fit"
        onClick={() => navigateToScreen("enter-email")}
      >
        <Trans>Back to enter email</Trans>
      </BackButton>
    </div>
  );
}
