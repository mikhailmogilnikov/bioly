import { Trans, useLingui } from "@lingui/react/macro";
import { Save } from "lucide-react";
import { useState } from "react";

import { CONFIG } from "@/shared/model/config";
import { SectionTitle } from "@/shared/ui/kit/section-title";

export function ChangeSlug() {
  const { t } = useLingui();
  const [username, setUsername] = useState("mikhailmogilnikov");

  return (
    <SectionTitle title={t`Your link`}>
      <div className="squircle-outline flex items-center justify-between p-4">
        <p className="font-medium text-base">
          <span className="text-foreground/50">{CONFIG.domain}/</span>
          <input
            className="font-medium text-base outline-none"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            value={username}
          />
        </p>
        <button
          className="pressable rounded-full bg-default p-2 font-medium text-base transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          disabled={username === "mikhailmogilnikov"}
          type="button"
        >
          <Save className="size-5" />
        </button>
      </div>
      <p className="-mt-1 text-foreground/50 text-sm">
        <Trans>Can be changed only once in 7 days.</Trans>
      </p>
    </SectionTitle>
  );
}
