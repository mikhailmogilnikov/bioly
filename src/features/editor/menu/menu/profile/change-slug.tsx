import { Trans, useLingui } from "@lingui/react/macro";
import { Save } from "lucide-react";
import { useState } from "react";
import { useProfile } from "@/features/editor/profile/use-profile";
import { CONFIG } from "@/shared/model/config";
import { SectionTitle } from "@/shared/ui/kit/section-title";

export function ChangeSlug() {
  const { t } = useLingui();

  const { slug, updateMainField } = useProfile(
    (state) => ({
      slug: state.profile.slug,
      updateMainField: state.updateMainField,
    }),
    "shallow"
  );

  const [username, setUsername] = useState(slug);

  const handleSave = () => {
    updateMainField("slug", username);
  };

  return (
    <SectionTitle title={t`Your link`}>
      <div className="squircle-outline flex items-center justify-between p-4">
        <p className="font-medium text-base">
          <span className="text-foreground/50">{CONFIG.domain}/</span>
          <input
            className="font-medium text-base outline-none placeholder:text-foreground/70"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            type="text"
            value={username}
          />
        </p>
        <button
          className="pressable rounded-full bg-default p-2 font-medium text-base transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          disabled={username === slug}
          onClick={handleSave}
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
