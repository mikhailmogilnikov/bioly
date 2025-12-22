export const FONTS = {
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
  [FONTS.OPEN_RUNDE]: "font-open-runde",
  [FONTS.INTER]: "font-inter",
  [FONTS.GILROY]: "font-gilroy",
  [FONTS.VOLKORN]: "font-vollkorn",
  [FONTS.JETBRAINS_MONO]: "font-jetbrains-mono",
  [FONTS.MONTSERRAT]: "font-montserrat",
  [FONTS.OSWALD]: "font-oswald",
  [FONTS.CAVEAT]: "font-caveat",
} as const;

export const THEMES = {
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
  THEMES.LIGHT,
  THEMES.GREEN,
  THEMES.PINK,
  THEMES.BLUE,
  THEMES.PURPLE,
  THEMES.GOLDEN,
  THEMES.TEAL,
  THEMES.CORAL,
  THEMES.LAVENDER,
  THEMES.SAND,
  THEMES.MINT,
  THEMES.SKY,
  THEMES.ICE,
  THEMES.PEACH,
] as const;

export const DARK_THEMES: Theme[] = [
  THEMES.DARK,
  THEMES.DARK_BLUE,
  THEMES.DARK_SLATE,
  THEMES.DARK_FOREST,
  THEMES.DARK_PLUM,
  THEMES.DARK_AMBER,
  THEMES.DARK_INK,
  THEMES.DARK_COPPER,
  THEMES.DARK_OLIVE,
  THEMES.DARK_INDIGO,
] as const;

export const ThemesNames: Record<Theme, string> = {
  [THEMES.LIGHT]: "Light",
  [THEMES.DARK]: "Dark",
  [THEMES.GREEN]: "Green",
  [THEMES.PINK]: "Pink",
  [THEMES.BLUE]: "Blue",
  [THEMES.PURPLE]: "Purple",
  [THEMES.GOLDEN]: "Golden",
  [THEMES.DARK_BLUE]: "Dark Blue",
  [THEMES.DARK_SLATE]: "Dark Slate",
  [THEMES.DARK_FOREST]: "Dark Forest",
  [THEMES.DARK_PLUM]: "Dark Plum",
  [THEMES.DARK_AMBER]: "Dark Amber",
  [THEMES.DARK_INK]: "Dark Ink",
  [THEMES.DARK_COPPER]: "Dark Copper",
  [THEMES.DARK_OLIVE]: "Dark Olive",
  [THEMES.DARK_INDIGO]: "Dark Indigo",
  [THEMES.TEAL]: "Teal",
  [THEMES.CORAL]: "Coral",
  [THEMES.LAVENDER]: "Lavender",
  [THEMES.SAND]: "Sand",
  [THEMES.MINT]: "Mint",
  [THEMES.SKY]: "Sky",
  [THEMES.ICE]: "Ice",
  [THEMES.PEACH]: "Peach",
} as const;

export const THEME_CLASSNAMES: Record<Theme, string> = {
  [THEMES.LIGHT]: "theme-light",
  [THEMES.DARK]: "theme-dark",
  [THEMES.GREEN]: "theme-green",
  [THEMES.PINK]: "theme-pink",
  [THEMES.BLUE]: "theme-blue",
  [THEMES.PURPLE]: "theme-purple",
  [THEMES.GOLDEN]: "theme-golden",
  [THEMES.DARK_BLUE]: "theme-dark-blue",
  [THEMES.DARK_SLATE]: "theme-dark-slate",
  [THEMES.DARK_FOREST]: "theme-dark-forest",
  [THEMES.DARK_PLUM]: "theme-dark-plum",
  [THEMES.DARK_AMBER]: "theme-dark-amber",
  [THEMES.DARK_INK]: "theme-dark-ink",
  [THEMES.DARK_COPPER]: "theme-dark-copper",
  [THEMES.DARK_OLIVE]: "theme-dark-olive",
  [THEMES.DARK_INDIGO]: "theme-dark-indigo",
  [THEMES.TEAL]: "theme-teal",
  [THEMES.CORAL]: "theme-coral",
  [THEMES.LAVENDER]: "theme-lavender",
  [THEMES.SAND]: "theme-sand",
  [THEMES.MINT]: "theme-mint",
  [THEMES.SKY]: "theme-sky",
  [THEMES.ICE]: "theme-ice",
  [THEMES.PEACH]: "theme-peach",
} as const;

export type Font = (typeof FONTS)[keyof typeof FONTS];
export type Theme = (typeof THEMES)[keyof typeof THEMES];

export interface ThemeSettings {
  font: Font;
  theme: Theme;
  show_avatar_blur: boolean;
  border_radius: number;
  border_width: number;
}
