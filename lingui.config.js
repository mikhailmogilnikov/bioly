import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "ru",
  locales: ["ru", "en"],
  catalogs: [
    {
      path: "<rootDir>/src/shared/i18n/locales/{locale}/messages",
      include: ["src"],
    },
  ],
});
