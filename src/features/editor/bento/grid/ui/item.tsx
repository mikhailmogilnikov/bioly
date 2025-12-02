import clsx from "clsx";
import { Move } from "lucide-react";
import { motion, type Transition } from "motion/react";
import { getResponsiveStyle, useRefresh } from "muuri-react";
import { useMemo, useState } from "react";
import { findBentoItem } from "@/features/editor/profile/find-bento-item";
import { useProfile } from "@/features/editor/profile/use-profile";
import {
  BentoBlockStyle,
  BentoBlockStyleClassNames,
} from "../../blocks/model/types";
import { BentoSizes, BentoTransitionSizes } from "../model/bento-sizes";
import { useBentoStore } from "../model/use-bento-store";
import { BentoGridItemFocused } from "./item-focused";

const BENTO_MARGIN_PX = 8;

export type BentoGridItemProps = {
  id: string;
};

export const SpringTransition: Transition = {
  type: "spring",
  stiffness: 450,
  damping: 35,
};

export function BentoGridItem({ id }: BentoGridItemProps) {
  const { bentoItem } = useProfile(
    (state) => ({
      bentoItem: findBentoItem(id, state),
    }),
    "shallow"
  );

  const { gridSize } = useBentoStore(
    (state) => ({
      gridSize: state.gridSize,
    }),
    "shallow"
  );

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(!isFocused);
  };

  const itemSize = bentoItem?.size;

  useRefresh([bentoItem?.size]);

  const responsiveStyle = useMemo(() => {
    if (!(gridSize && itemSize)) return;

    return getResponsiveStyle({
      ...BentoSizes(gridSize)[itemSize],
      margin: BENTO_MARGIN_PX,
    });
  }, [itemSize, gridSize]);

  const transitionStyle = useMemo(() => {
    if (!(gridSize && itemSize)) return;

    return BentoTransitionSizes(gridSize)[itemSize];
  }, [itemSize, gridSize]);

  if (!(bentoItem && gridSize && transitionStyle && responsiveStyle))
    return null;

  return (
    <>
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
          <BentoGridBlockHandle id={id} />
          <button
            className={clsx(
              "size-full",
              BentoBlockStyleClassNames[
                bentoItem?.style ?? BentoBlockStyle.PLAIN
              ]
            )}
            onClick={handleFocus}
            type="button"
          >
            {bentoItem?.type}
          </button>
        </motion.div>
      </div>
      <BentoGridItemFocused
        bentoItem={bentoItem}
        focused={isFocused}
        gridSize={gridSize}
        transitionStyle={transitionStyle}
        unfocus={() => setIsFocused(false)}
      />
    </>
  );
}

const BentoGridBlockHandle = ({ id }: { id: string }) => (
  <div
    className="handle -right-2 -bottom-2 absolute z-1 flex size-8 cursor-grab items-center justify-center rounded-full bg-background/70 outline outline-outline transition-transform active:scale-120"
    id={`bento-item-${id}-handle`}
  >
    <Move className="size-5 text-foreground" />
  </div>
);
