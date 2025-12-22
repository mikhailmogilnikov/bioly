import type { Font, Theme as ThemeType } from "@/shared/domain/theme";

export interface ProfileTheme {
  font: Font;
  theme: ThemeType;
  show_avatar_blur: boolean;
  border_radius: number;
  border_width: number;
}
