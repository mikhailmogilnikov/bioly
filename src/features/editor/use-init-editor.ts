import { useEffect, useEffectEvent, useState } from "react";
import {
  FONT_CLASSNAMES,
  type Font,
  THEME_CLASSNAMES,
  type Theme,
} from "@/shared/domain/theme";
import { useProfile } from "./profile/use-profile";

export function useInitEditor() {
  const [isEditorLoading, setIsEditorLoading] = useState(true);

  const setupEditor = useEffectEvent(() => {
    const { theme, font, border_radius, border_width } =
      useProfile.getState().profile.theme;

    // TODO: remove this after testing
    changeBodyTheme(theme);
    changeBodyFont(font);
    changeBodyBorderRadius(border_radius);
    changeBodyBorderWidth(border_width);

    queueMicrotask(() => {
      setIsEditorLoading(false);
    });
  });

  useEffect(() => {
    setupEditor();
  }, []);

  return {
    isEditorLoading,
  };
}

export const changeBodyTheme = (theme: Theme) => {
  const currentTheme = window.document.body.classList.value
    .split(" ")
    .find((className) => className.startsWith("theme-"));

  if (currentTheme) {
    window.document.body.classList.remove(currentTheme);
  }

  window.document.body.classList.add(THEME_CLASSNAMES[theme]);
};

export const changeBodyFont = (font: Font) => {
  const currentFont = window.document.body.classList.value
    .split(" ")
    .find((className) => className.startsWith("font-"));

  if (currentFont) {
    window.document.body.classList.remove(currentFont);
  }

  window.document.body.classList.add(FONT_CLASSNAMES[font]);
};

export const changeBodyBorderRadius = (borderRadius: number) => {
  window.document.body.style.setProperty("--radius", `${borderRadius}px`);
};

export const changeBodyBorderWidth = (borderWidth: number) => {
  window.document.body.style.setProperty("--border-width", `${borderWidth}px`);
};
