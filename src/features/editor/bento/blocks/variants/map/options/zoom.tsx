import { useLingui } from "@lingui/react/macro";
import { useBlockContext } from "@/features/editor/bento/grid/ui/block-context";
import { useProfile } from "@/features/editor/profile/use-profile";
import { Slider } from "@/shared/ui/kit/primitives/slider";
import { SectionTitle } from "@/shared/ui/kit/section-title";

export function BentoBlockMapZoom({ className }: { className?: string }) {
  const { block } = useBlockContext<"map">();
  const { t } = useLingui();
  const updateBentoBlockField = useProfile(
    (state) => state.updateBentoBlockField
  );

  if (!block) return null;

  const { zoom } = block.properties;

  const handleZoomChange = (zoom: number[]) => {
    updateBentoBlockField(block.id, "properties", {
      ...block.properties,
      zoom: zoom[0] ?? 0,
    });
  };

  return (
    <SectionTitle
      className={className}
      contentClassName="mt-2"
      sideContent={<p className="text-sm opacity-50">{zoom}</p>}
      title={t`Map zoom`}
    >
      <Slider
        max={22}
        min={0}
        onValueChange={handleZoomChange}
        step={1}
        value={[zoom]}
      />
    </SectionTitle>
  );
}
