import clsx from "clsx";
import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { PortalOverlay } from "@/shared/ui/kit/overlays/portal-overlay";
import { AnimatePresence } from "@/shared/ui/utils/animate-presence";
import { BentoBlockStyleClassNames } from "../../blocks/model/types";
import { useRenderBlock } from "../../blocks/model/use-render-block";
import { BentoItemOptions } from "../../blocks/shared-settings";
import { useBlockContext } from "./block-context";
import { SpringTransition } from "./item";

type BentoGridItemFocusedProps = {
  transitionStyle: CSSProperties;
  gridSize: number;
};

export function BentoGridItemFocused({
  transitionStyle,
  gridSize,
}: BentoGridItemFocusedProps) {
  const { block, isFocused, handleBlockUnfocus } = useBlockContext();

  const { renderBlock } = useRenderBlock();

  if (!(block && gridSize)) return null;

  return (
    <PortalOverlay isOpen={isFocused} onClose={handleBlockUnfocus}>
      {/** biome-ignore lint/a11y/noNoninteractiveElementInteractions: no nested interactive elements */}
      {/** biome-ignore lint/a11y/useKeyWithClickEvents: no nested interactive elements */}
      {/** biome-ignore lint/a11y/noStaticElementInteractions: no nested interactive elements */}
      <div
        className="absolute inset-0 overflow-y-auto"
        onClick={handleBlockUnfocus}
      >
        <div
          className="relative z-2 mx-auto mt-30 mb-20 flex w-full max-w-(--max-width) flex-col gap-8"
          style={{ "--max-width": `${gridSize}px` } as CSSProperties}
        >
          <AnimatePresence key={`bento-item-${block.id}-wrapper`}>
            {isFocused && (
              <motion.div
                className={clsx(
                  "transition-[width,height] duration-300 will-change-[width,height]",
                  BentoBlockStyleClassNames[block.style]
                )}
                id={`bento-item-${block.id}-wrapper`}
                layoutId={`bento-item-${block.id}`}
                onClick={(e) => e.stopPropagation()}
                style={transitionStyle}
                transition={SpringTransition}
              >
                {renderBlock(block.id, { isFullscreen: true })}
              </motion.div>
            )}
          </AnimatePresence>
          <BentoItemOptions />
        </div>
      </div>
    </PortalOverlay>
  );
}
