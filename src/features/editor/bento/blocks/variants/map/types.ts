export const BentoBlockMapThemes = {
  LIGHT: "light",
  DARK: "dark",
  POSITRON: "positron",
} as const;

export const BentoBlockMapThemeAll = {
  ...BentoBlockMapThemes,
  DARK_NO_LABELS: "darkNolabels",
  LIGHT_NO_LABELS: "lightNolabels",
  POSITRON_NO_LABELS: "positronNolabels",
} as const;

export type BentoBlockMapThemes =
  (typeof BentoBlockMapThemes)[keyof typeof BentoBlockMapThemes];

export type MapThemes =
  (typeof BentoBlockMapThemeAll)[keyof typeof BentoBlockMapThemeAll];

export interface BentoBlockPropertiesMap {
  theme: BentoBlockMapThemes;
  labels: boolean;
  zoom: number;
}

export const getMapTheme = (
  theme: BentoBlockMapThemes,
  labels: boolean
): MapThemes => {
  if (labels) {
    return theme;
  }
  return `${theme}Nolabels`;
};
