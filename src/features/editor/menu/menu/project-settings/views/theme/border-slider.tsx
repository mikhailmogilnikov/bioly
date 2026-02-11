import { Trans } from "@lingui/react/macro";
import { useProfile } from "@/features/editor/profile/use-profile";
import { Slider } from "@/shared/ui/kit/primitives/slider";

export function BorderSlider() {
  const updateThemeField = useProfile((state) => state.updateThemeField);
  const currentBorder = useProfile((state) => state.profile.theme.border_width);

  const handleRoundChange = (round: number[]) => {
    window.document.body.style.setProperty("--border-width", `${round[0]}px`);
    updateThemeField("border_width", round[0] ?? 0);
  };

  return (
    <div className="squircle-outline flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <p className="font-medium text-base">
          <Trans>Border width</Trans>
        </p>
        <p className="font-medium text-base opacity-50">{currentBorder}px</p>
      </div>
      <Slider
        className="mb-1"
        max={6}
        min={1}
        onValueChange={handleRoundChange}
        step={1}
        value={[currentBorder]}
      />
    </div>
  );
}
