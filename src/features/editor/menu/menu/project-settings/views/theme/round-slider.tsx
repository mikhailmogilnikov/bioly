import { Trans } from "@lingui/react/macro";
import { useProfile } from "@/features/editor/profile/use-profile";
import { Slider } from "@/shared/ui/kit/primitives/slider";

export function RoundSlider() {
  const updateThemeField = useProfile((state) => state.updateThemeField);
  const currentRound = useProfile((state) => state.profile.theme.border_radius);

  const handleRoundChange = (round: number[]) => {
    window.document.body.style.setProperty("--radius", `${round[0]}px`);

    updateThemeField("border_radius", round[0] ?? 0);
  };

  return (
    <div className="squircle-outline flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <p className="font-medium text-base">
          <Trans>Corner radius</Trans>
        </p>
        <p className="font-medium text-base opacity-50">{currentRound}px</p>
      </div>
      <Slider
        className="mb-1"
        max={42}
        min={0}
        onValueChange={handleRoundChange}
        step={1}
        value={[currentRound]}
      />
    </div>
  );
}
