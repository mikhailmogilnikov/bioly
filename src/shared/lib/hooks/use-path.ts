import type { Locale } from "@lingui/core";
import { useLingui } from "@lingui/react/macro";
import { CONFIG } from "@/shared/model/config";

export type LocalizedPath = "/" | "/editor" | "/explore" | "/login";

export const useLocalizedPath = () => {
  const { i18n } = useLingui();
  const locale = (i18n.locale as Locale) ?? CONFIG.defaultLocale;

  const getLocalizedPath = (path: LocalizedPath) => `/${locale}${path}`;

  return {
    getLocalizedPath,
  };
};
