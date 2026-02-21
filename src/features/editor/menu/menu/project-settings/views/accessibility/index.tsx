"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import type { ChangeEvent } from "react";
import AnimateHeight from "react-animate-height";
import { useProfile } from "@/features/editor/profile/use-profile";
import { AdaptiveModalContent } from "@/shared/ui/kit/overlays/adaptive-modal";
import {
  ModalControlRow,
  ModalDropdown,
} from "@/shared/ui/kit/overlays/modal-controls";
import { Separator } from "@/shared/ui/kit/primitives/separator";
import { SwitchField } from "@/shared/ui/kit/primitives/switch-field";

const LANG_OPTIONS: { label: string; value: string }[] = [
  { label: "English", value: "en" },
  { label: "Русский", value: "ru" },
  { label: "Deutsch", value: "de" },
  { label: "Français", value: "fr" },
  { label: "Español", value: "es" },
  { label: "Italiano", value: "it" },
  { label: "Português", value: "pt" },
  { label: "日本語", value: "ja" },
  { label: "中文", value: "zh" },
  { label: "한국어", value: "ko" },
  { label: "العربية", value: "ar" },
  { label: "Nederlands", value: "nl" },
  { label: "Polski", value: "pl" },
  { label: "Türkçe", value: "tr" },
  { label: "Українська", value: "uk" },
  { label: "Tiếng Việt", value: "vi" },
  { label: "ไทย", value: "th" },
  { label: "Bahasa Indonesia", value: "id" },
  { label: "हिन्दी", value: "hi" },
  { label: "Svenska", value: "sv" },
];

const LANG_VALUES = new Set(LANG_OPTIONS.map((o) => o.value));

const META_DESCRIPTION_MAX_LENGTH = 200;

export function SettingsAccessibilityView() {
  const { t } = useLingui();
  const metaDescription = useProfile(
    (state) => state.profile.meta_description ?? ""
  );
  const langRaw = useProfile((state) => state.profile.lang ?? "en");
  const lang = LANG_VALUES.has(langRaw) ? langRaw : "en";
  const allowIndexing = useProfile(
    (state) => state.profile.allow_indexing ?? true
  );
  const updateMainField = useProfile((state) => state.updateMainField);

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateMainField("meta_description", e.target.value);
  };

  const handleLangChange = (value: string) => {
    updateMainField("lang", value);
  };

  const handleAllowIndexingChange = (checked: boolean) => {
    updateMainField("allow_indexing", checked);
  };

  return (
    <AdaptiveModalContent>
      <div className="flex flex-col gap-6 py-1">
        <div className="flex flex-col gap-6">
          <SwitchField
            checked={allowIndexing}
            label={<Trans>Allow search engines to index this page</Trans>}
            labelClassName="font-medium text-base"
            onCheckedChange={handleAllowIndexingChange}
          />
          <AnimateHeight duration={200} height={allowIndexing ? "auto" : 0}>
            <div className="flex flex-col gap-6">
              <Separator />
              <div className="flex flex-col gap-2">
                <label
                  className="font-medium text-base"
                  htmlFor="meta-description"
                >
                  <Trans>SEO description</Trans>
                </label>
                <textarea
                  className="min-h-24 w-full resize-y rounded-2xl bg-default/50 px-4 py-3 font-medium text-base outline-none placeholder:text-foreground/50"
                  id="meta-description"
                  maxLength={META_DESCRIPTION_MAX_LENGTH}
                  onChange={handleDescriptionChange}
                  placeholder={t`Description for search engines...`}
                  rows={4}
                  value={metaDescription}
                />
                <p
                  className={
                    metaDescription.length >= META_DESCRIPTION_MAX_LENGTH
                      ? "text-danger text-sm"
                      : "text-foreground/50 text-sm"
                  }
                >
                  {metaDescription.length}/{META_DESCRIPTION_MAX_LENGTH}
                </p>
              </div>

              <ModalControlRow label={<Trans>Site language (SEO)</Trans>}>
                <ModalDropdown
                  label={<Trans>Site language</Trans>}
                  onValueChange={handleLangChange}
                  options={LANG_OPTIONS}
                  renderTrigger={(_, label) => (
                    <p className="font-medium text-base">{label}</p>
                  )}
                  value={lang}
                />
              </ModalControlRow>
            </div>
          </AnimateHeight>
        </div>
      </div>
    </AdaptiveModalContent>
  );
}
