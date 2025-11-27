export const FONTS = {
  INTER: "inter",
  OPEN_RUNDE: "open-runde",
  GILROY: "gilroy",
  VOLKORN: "vollkorn",
  JETBRAINS_MONO: "jetbrains-mono",
  MONTSERRAT: "montserrat",
  OSWALD: "oswald",
  CAVEAT: "caveat",
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
} as const;

export const ThemesNames: Record<Theme, string> = {
  [THEMES.LIGHT]: "Light",
  [THEMES.DARK]: "Dark",
  [THEMES.GREEN]: "Green",
  [THEMES.PINK]: "Pink",
  [THEMES.BLUE]: "Blue",
  [THEMES.PURPLE]: "Purple",
  [THEMES.GOLDEN]: "Golden",
  [THEMES.DARK_BLUE]: "Dark Blue",
} as const;

export type Font = (typeof FONTS)[keyof typeof FONTS];
export type Theme = (typeof THEMES)[keyof typeof THEMES];

export type ThemeSettings = {
  font: Font;
  theme: Theme;
  show_avatar_blur: boolean;
  border_radius: number;
  border_width: number;
};
