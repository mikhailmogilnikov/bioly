import { useBlockContext } from "../../grid/ui/block-context";
import { useRenderBlockSettings } from "../model/use-render-block-settings";

export type BentoItemOptionsProps = {
  id: string;
};

export const BentoItemOptions = () => {
  const { id } = useBlockContext();
  const { renderBlockSettings } = useRenderBlockSettings();

  if (!id) return null;

  return (
    // biome-ignore lint/a11y/noNoninteractiveElementInteractions: we need to stop propagation
    // biome-ignore lint/a11y/useKeyWithClickEvents: we need to stop propagation
    // biome-ignore lint/a11y/noStaticElementInteractions: we need to stop propagation
    <div
      className="motion-duration-300 data-[state=closed]:motion-opacity-out-0 data-[state=open]:motion-scale-in-0 data-[state=open]:motion-opacity-in-0 data-[state=open]:motion-delay-200 flex w-60 origin-top-left flex-col gap-4 rounded border border-outline bg-background p-4"
      data-state="open"
      id={`bento-item-${id}-panel`}
      onClick={(e) => e.stopPropagation()}
    >
      {renderBlockSettings()}
    </div>
  );
};
