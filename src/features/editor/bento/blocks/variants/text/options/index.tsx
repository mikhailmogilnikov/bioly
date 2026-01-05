import { Trans } from "@lingui/react/macro";
import { BentoBlockDeleteSetting } from "../../../shared-settings/delete";

export function BentoBlockTextOptions() {
  return (
    <>
      <p className="font-medium text-foreground/50 text-sm">
        <Trans>
          Use "/" when typing to access commands.
          <br /> <br />
          Select a text fragment to apply additional formatting.
        </Trans>
      </p>

      <BentoBlockDeleteSetting />
    </>
  );
}
