import { Trans } from "@lingui/react/macro";
import { useProfile } from "@/features/editor/profile/use-profile";
import {
  changeBodyFont,
  changeBodyTheme,
} from "@/features/editor/use-init-editor";
import {
  FONT_CLASSNAMES,
  FONTS,
  type Font,
  THEME_CLASSNAMES,
  THEMES,
  type Theme,
  ThemesNames,
} from "@/shared/domain/theme";
import { cn } from "@/shared/lib/utils";
import {
  ModalControlRow,
  ModalDropdown,
  ModalSlider,
} from "@/shared/ui/kit/overlays/modal-controls";

const THEME_OPTIONS = Object.values(THEMES).map((theme) => ({
  label: ThemesNames[theme],
  value: theme,
}));

const FONT_OPTIONS = Object.values(FONTS).map((font) => ({
  label: font,
  value: font,
}));

export function MainSettings() {
  const updateThemeField = useProfile((state) => state.updateThemeField);
  const currentTheme = useProfile((state) => state.profile.theme.theme);
  const currentFont = useProfile((state) => state.profile.theme.font);
  const currentRound = useProfile((state) => state.profile.theme.border_radius);
  const currentBorder = useProfile((state) => state.profile.theme.border_width);

  const handleThemeChange = (theme: Theme) => {
    changeBodyTheme(theme);
    updateThemeField("theme", theme);
  };

  const handleFontChange = (font: Font) => {
    changeBodyFont(font);
    updateThemeField("font", font);
  };

  const handleRoundChange = (value: number) => {
    window.document.body.style.setProperty("--radius", `${value}px`);
    updateThemeField("border_radius", value);
  };

  const handleBorderChange = (value: number) => {
    window.document.body.style.setProperty("--border-width", `${value}px`);
    updateThemeField("border_width", value);
  };

  return (
    <>
      <ModalControlRow label={<Trans>Theme</Trans>}>
        <ModalDropdown<Theme>
          label={<Trans>Theme</Trans>}
          onValueChange={handleThemeChange}
          options={THEME_OPTIONS}
          renderOption={(option) => (
            <>
              <div
                className={cn(
                  THEME_CLASSNAMES[option.value],
                  "size-6 rounded-full border border-outline bg-linear-to-bl from-background to-default"
                )}
              />
              <p className="font-medium text-base">{option.label}</p>
            </>
          )}
          renderTrigger={(_, label) => (
            <>
              <div
                className={cn(
                  currentTheme,
                  "size-6 rounded-full border border-outline bg-linear-to-bl from-background to-default"
                )}
              />
              <p className="font-medium text-base">{label}</p>
            </>
          )}
          value={currentTheme}
        />
      </ModalControlRow>

      <ModalControlRow label={<Trans>Font</Trans>}>
        <ModalDropdown<Font>
          label={<Trans>Font</Trans>}
          onValueChange={handleFontChange}
          options={FONT_OPTIONS}
          renderOption={(option) => (
            <p
              className={cn(
                FONT_CLASSNAMES[option.value],
                "font-medium text-base first-letter:capitalize"
              )}
            >
              {option.label}
            </p>
          )}
          renderTrigger={(value, label) => (
            <p
              className={cn(
                FONT_CLASSNAMES[value],
                "font-medium text-base first-letter:capitalize"
              )}
            >
              {label}
            </p>
          )}
          value={currentFont}
        />
      </ModalControlRow>

      <ModalSlider
        defaultValue={24}
        label={<Trans>Corner radius</Trans>}
        max={42}
        min={0}
        onValueChange={handleRoundChange}
        step={1}
        value={currentRound}
        valueSuffix="px"
      />

      <ModalSlider
        defaultValue={1}
        label={<Trans>Border width</Trans>}
        max={6}
        min={1}
        onValueChange={handleBorderChange}
        step={1}
        value={currentBorder}
        valueSuffix="px"
      />
    </>
  );
}
