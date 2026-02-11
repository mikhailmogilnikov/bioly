import { Trans, useLingui } from "@lingui/react/macro";
import { Check, ChevronRight, Copy, Link } from "lucide-react";
import { useState } from "react";
import { useProfile } from "@/features/editor/profile/use-profile";
import { useModalViews } from "@/shared/lib/providers/modal-views/modal-views-provider";
import { buildUrl } from "@/shared/lib/utils/build-url";
import { Separator } from "@/shared/ui/kit/primitives/separator";
import { SectionTitle } from "@/shared/ui/kit/section-title";
import type { ProjectSettingsViews } from "../..";

export function SettingsMyLink() {
  const { t } = useLingui();
  const { push } = useModalViews<ProjectSettingsViews>();
  const [copied, setCopied] = useState(false);

  const link = useProfile((state) => state.profile.slug);
  const displayUrl = buildUrl(link, { withoutHttps: true });
  const fullUrl = buildUrl(link);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  return (
    <SectionTitle
      contentClassName="squircle flex flex-col gap-0"
      title={t`Your personal link`}
    >
      <button
        aria-label={t`Copy personal link`}
        className="flex items-center justify-between gap-1 p-5 transition-colors hover:bg-foreground/5 active:bg-foreground/10"
        onClick={handleCopy}
        type="button"
      >
        <div className="flex items-center gap-3">
          <Link aria-hidden className="size-5" />
          <p className="font-medium text-base">{displayUrl}</p>
        </div>
        {copied ? (
          <Check aria-hidden className="size-5 text-success" />
        ) : (
          <Copy aria-hidden className="size-5" />
        )}
      </button>
      {/* Live region for screen readers: announces "Copied!" when link is copied */}
      <output aria-live="polite" className="sr-only">
        {copied ? <Trans>Copied!</Trans> : null}
      </output>
      <Separator className="" />
      <button
        aria-label={t`Change slug`}
        className="flex items-center justify-center gap-1 p-3 font-medium text-base transition-colors hover:bg-foreground/5 active:bg-foreground/10"
        onClick={() => push("change-slug")}
        type="button"
      >
        <Trans>Change slug</Trans>
        <ChevronRight aria-hidden className="size-5" />
      </button>
    </SectionTitle>
  );
}
