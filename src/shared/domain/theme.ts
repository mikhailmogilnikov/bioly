import type { components } from "../api/schema/generated";

export const FONTS: Record<string, components["schemas"]["Font"]> = {
  OPEN_RUNDE: "open-runde",
  INTER: "inter",
  GILROY: "gilroy",
  VOLKORN: "vollkorn",
  JETBRAINS_MONO: "jetbrains-mono",
  MONTSERRAT: "montserrat",
  OSWALD: "oswald",
  CAVEAT: "caveat",
} as const;

export const FONT_CLASSNAMES: Record<Font, string> = {
  "open-runde": "font-open-runde",
  inter: "font-inter",
  gilroy: "font-gilroy",
  vollkorn: "font-vollkorn",
  "jetbrains-mono": "font-jetbrains-mono",
  montserrat: "font-montserrat",
  oswald: "font-oswald",
  caveat: "font-caveat",
} as const;

export const THEMES: Record<string, components["schemas"]["Theme"]> = {
  LIGHT: "light",
  DARK: "dark",

  GREEN: "green",
  PINK: "pink",
  BLUE: "blue",
  PURPLE: "purple",
  GOLDEN: "golden",

  DARK_BLUE: "dark-blue",
  DARK_SLATE: "dark-slate",
  DARK_FOREST: "dark-forest",
  DARK_PLUM: "dark-plum",
  DARK_AMBER: "dark-amber",
  DARK_INK: "dark-ink",
  DARK_COPPER: "dark-copper",
  DARK_OLIVE: "dark-olive",
  DARK_INDIGO: "dark-indigo",

  TEAL: "teal",
  CORAL: "coral",
  LAVENDER: "lavender",
  SAND: "sand",
  MINT: "mint",
  SKY: "sky",
  ICE: "ice",
  PEACH: "peach",
} as const;

export const LIGHT_THEMES: Theme[] = [
  "light",
  "green",
  "pink",
  "blue",
  "purple",
  "golden",
  "teal",
  "coral",
  "lavender",
  "sand",
  "mint",
  "sky",
  "ice",
  "peach",
] as const;

export const DARK_THEMES: Theme[] = [
  "dark",
  "dark-blue",
  "dark-slate",
  "dark-forest",
  "dark-plum",
  "dark-amber",
  "dark-ink",
  "dark-copper",
  "dark-olive",
  "dark-indigo",
] as const;

export const ThemesNames: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
  green: "Green",
  pink: "Pink",
  blue: "Blue",
  purple: "Purple",
  golden: "Golden",
  "dark-blue": "Dark Blue",
  "dark-slate": "Dark Slate",
  "dark-forest": "Dark Forest",
  "dark-plum": "Dark Plum",
  "dark-amber": "Dark Amber",
  "dark-ink": "Dark Ink",
  "dark-copper": "Dark Copper",
  "dark-olive": "Dark Olive",
  "dark-indigo": "Dark Indigo",
  teal: "Teal",
  coral: "Coral",
  lavender: "Lavender",
  sand: "Sand",
  mint: "Mint",
  sky: "Sky",
  ice: "Ice",
  peach: "Peach",
} as const;

export const THEME_CLASSNAMES: Record<Theme, string> = {
  light: "theme-light",
  dark: "theme-dark",
  green: "theme-green",
  pink: "theme-pink",
  blue: "theme-blue",
  purple: "theme-purple",
  golden: "theme-golden",
  "dark-blue": "theme-dark-blue",
  "dark-slate": "theme-dark-slate",
  lavender: "theme-lavender",
  sand: "theme-sand",
  mint: "theme-mint",
  sky: "theme-sky",
  ice: "theme-ice",
  peach: "theme-peach",
  "dark-forest": "theme-dark-forest",
  "dark-plum": "theme-dark-plum",
  "dark-amber": "theme-dark-amber",
  "dark-ink": "theme-dark-ink",
  "dark-copper": "theme-dark-copper",
  "dark-olive": "theme-dark-olive",
  "dark-indigo": "theme-dark-indigo",
  teal: "theme-teal",
  coral: "theme-coral",
} as const;

export type Font = components["schemas"]["Font"];
export type Theme = components["schemas"]["Theme"];

export type ThemeSettings = components["schemas"]["ProfileTheme"];
