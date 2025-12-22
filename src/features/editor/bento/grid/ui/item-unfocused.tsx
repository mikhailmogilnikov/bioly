import clsx from "clsx";
import { Move } from "lucide-react";
import { motion } from "motion/react";
import { getResponsiveStyle } from "muuri-react";
import { type CSSProperties, useMemo } from "react";
import { BentoBlockStyleClassNames } from "../../blocks/model/types";
import { useRenderBlock } from "../../blocks/model/use-render-block";
import { BentoSizes } from "../model/bento-sizes";
import { useBentoStore } from "../model/use-bento-store";
import { useBlockContext } from "./block-context";
import { SpringTransition } from "./item";

interface BentoGridItemUnfocusedProps {
  transitionStyle: CSSProperties;
}

const BENTO_MARGIN_PX = 8;

export function BentoGridItemUnfocused({
  transitionStyle,
}: BentoGridItemUnfocusedProps) {
  const { id, block, isFocused, handleBlockFocus } = useBlockContext();

  const { gridSize } = useBentoStore(
    (state) => ({
      gridSize: state.gridSize,
    }),
    "shallow"
  );

  const { renderBlock } = useRenderBlock();

  const responsiveStyle = useMemo(() => {
    if (!(gridSize && block?.size)) return;

    return getResponsiveStyle({
      ...BentoSizes(gridSize)[block.size],
      margin: BENTO_MARGIN_PX,
    });
  }, [block?.size, gridSize]);

  if (!(id && block && responsiveStyle)) return null;

  return (
    <div data-id={id} style={responsiveStyle}>
      <motion.div
        animate={isFocused ? { opacity: 0.3 } : { opacity: 1 }}
        className={clsx(
          "relative size-full transition-[width,height] duration-300 will-change-[width,height]"
        )}
        layoutId={`bento-item-${id}`}
        style={transitionStyle}
        transition={SpringTransition}
      >
        <BentoGridBlockHandle />
        <button
          className={clsx("size-full", BentoBlockStyleClassNames[block.style])}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            handleBlockFocus();
          }}
          type="button"
        >
          {renderBlock(id, { isFullscreen: false })}
        </button>
      </motion.div>
    </div>
  );
}

const BentoGridBlockHandle = () => {
  const { id } = useBlockContext();

  if (!id) return null;

  return (
    <div
      className="handle absolute -right-2 -bottom-2 z-1 flex size-8 cursor-grab items-center justify-center rounded-full bg-background/70 outline outline-outline transition-transform active:scale-120"
      id={`bento-item-${id}-handle`}
    >
      <Move className="size-5 text-foreground" />
    </div>
  );
};
