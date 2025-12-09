import type { ReactElement, ReactNode } from "react";

export type SpoilerPainterOptions = {
  readonly fps?: number;
  readonly gap?: number | boolean;
  readonly density?: number;
  readonly mimicWords?: boolean;
  readonly accentColor?: string;
  readonly fallback?: string | false;
  readonly forceFallback?: boolean;
};

export type SpoilerProps = {
  // control spoiler state from the parent
  hidden?: boolean;

  // for uncontrolled components only
  defaultHidden?: boolean;
  revealOn?: "click" | "hover" | false;
  onHiddenChange?: (hidden: boolean) => void;

  // customize the tag of the wrapper element
  tagName?: keyof React.JSX.IntrinsicElements;

  // how spoiler content will transition on reveal/hide
  transition?: false | "none" | "fade" | "iris";

  // accent color, e.g. "#333" or ["#333", "#fff"] for light and dark themes
  accentColor?: string | [string, string];

  theme?: "system" | "light" | "dark";

  noiseFadeDuration?: number;
} & Omit<React.JSX.IntrinsicElements["span"], "style"> &
  AsChildProps &
  Omit<SpoilerPainterOptions, "accentColor">;

type AsChildProps =
  | {
      // only single React elements can be composed via `asChild` prop
      children: ReactElement;
      asChild: true;
    }
  | {
      // anything
      children: ReactNode;
      asChild?: false;
    };
