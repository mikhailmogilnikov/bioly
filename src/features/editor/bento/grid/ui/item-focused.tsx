import clsx from "clsx";
import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { PortalOverlay } from "@/shared/ui/kit/overlays/portal-overlay";
import { AnimatePresence } from "@/shared/ui/utils/animate-presence";
import {
  type BentoBlock,
  BentoBlockStyleClassNames,
  type BentoBlockTypeKey,
} from "../../blocks/model/types";
import { SpringTransition } from "./item";

type BentoGridItemFocusedProps = {
  bentoItem: BentoBlock<BentoBlockTypeKey>;
  gridSize: number;
  focused: boolean;
  unfocus: () => void;
  transitionStyle: CSSProperties;
};

export function BentoGridItemFocused({
  bentoItem,
  gridSize,
  focused,
  unfocus,
  transitionStyle,
}: BentoGridItemFocusedProps) {
  return (
    <PortalOverlay isOpen={focused} onClose={unfocus}>
      <button
        className="absolute inset-0 overflow-y-auto"
        onClick={unfocus}
        type="button"
      >
        <div
          className="relative z-2 mx-auto mt-30 mb-20 flex w-full max-w-(--max-width) flex-col gap-8"
          style={{ "--max-width": `${gridSize}px` } as CSSProperties}
        >
          <AnimatePresence key={`bento-item-${bentoItem.id}-wrapper`}>
            {focused && (
              <motion.div
                className={clsx(
                  "transition-[width,height] duration-300 will-change-[width,height]",
                  BentoBlockStyleClassNames[bentoItem?.style]
                )}
                id={`bento-item-${bentoItem.id}-wrapper`}
                layoutId={`bento-item-${bentoItem.id}`}
                onClick={(e) => e.stopPropagation()}
                style={transitionStyle}
                transition={SpringTransition}
              >
                {bentoItem && "bentoItem"}
              </motion.div>
            )}
          </AnimatePresence>
          {/* <BentoItemOptions
            id={id}
            onDelete={handleDelete}
            onSizeChange={handleChangeSize}
          /> */}
        </div>
      </button>
    </PortalOverlay>
  );
}
