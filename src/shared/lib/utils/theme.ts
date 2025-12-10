import { DARK_THEMES, LIGHT_THEMES, type Theme } from "@/shared/domain/theme";

export const detectThemeStyle = (currentTheme: Theme): "light" | "dark" => {
  if (LIGHT_THEMES.includes(currentTheme)) {
    return "light";
  }

  if (DARK_THEMES.includes(currentTheme)) {
    return "dark";
  }

  return "dark";
};
