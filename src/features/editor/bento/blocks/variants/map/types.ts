import { DARK_THEMES, type Theme } from "@/shared/domain/theme";

export const BentoBlockMapTitleAlignOptions = {
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_CENTER: "bottom-center",
  BOTTOM_RIGHT: "bottom-right",
  TOP_LEFT: "top-left",
  TOP_CENTER: "top-center",
  TOP_RIGHT: "top-right",
} as const;

export type BentoBlockMapTitleAlign =
  (typeof BentoBlockMapTitleAlignOptions)[keyof typeof BentoBlockMapTitleAlignOptions];

export interface BentoBlockPropertiesMap {
  theme: BentoBlockMapThemesOptions;
  labels: boolean;
  interactions: boolean;
  zoom: number;
  title: string;
  titleAlign: BentoBlockMapTitleAlign;
  latitude: number;
  longitude: number;
}

export const BentoBlockMapThemes = {
  LIGHT: "light",
  DARK: "dark",
  POSITRON: "positron",
} as const;

export type BentoBlockMapThemes =
  (typeof BentoBlockMapThemes)[keyof typeof BentoBlockMapThemes];

export const BentoBlockMapThemeAll = {
  ...BentoBlockMapThemes,
  DARK_NO_LABELS: "darkNolabels",
  LIGHT_NO_LABELS: "lightNolabels",
  POSITRON_NO_LABELS: "positronNolabels",
} as const;

export type MapThemes =
  (typeof BentoBlockMapThemeAll)[keyof typeof BentoBlockMapThemeAll];

export const BentoBlockMapThemesOptions = {
  AUTO: "auto",
  ...BentoBlockMapThemes,
} as const;

export type BentoBlockMapThemesOptions =
  (typeof BentoBlockMapThemesOptions)[keyof typeof BentoBlockMapThemesOptions];

export const getMapTheme = (
  theme: BentoBlockMapThemes,
  labels: boolean
): MapThemes => {
  if (labels) {
    return theme;
  }
  return `${theme}Nolabels`;
};

export const resolveMapTheme = (
  mapTheme: BentoBlockMapThemesOptions,
  profileTheme: Theme
): BentoBlockMapThemes => {
  if (mapTheme !== "auto") return mapTheme;
  if (DARK_THEMES.includes(profileTheme)) return "dark";

  return "light";
};
