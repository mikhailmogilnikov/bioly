import type { Transition } from "motion/react";
import { useRefresh } from "muuri-react";
import { useMemo } from "react";
import { findBentoItem } from "@/features/editor/profile/find-bento-item";
import { useProfile } from "@/features/editor/profile/use-profile";
import { BentoTransitionSizes } from "../model/bento-sizes";
import { useBentoStore } from "../model/use-bento-store";
import { BentoGridBlockProvider } from "./block-context";
import { BentoGridItemFocused } from "./item-focused";
import { BentoGridItemUnfocused } from "./item-unfocused";

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

  const itemSize = bentoItem?.size;

  useRefresh([bentoItem?.size]);

  const transitionStyle = useMemo(() => {
    if (!(gridSize && itemSize)) return;

    return BentoTransitionSizes(gridSize)[itemSize];
  }, [itemSize, gridSize]);

  if (!(bentoItem && gridSize && transitionStyle)) return null;

  return (
    <BentoGridBlockProvider block={bentoItem} id={id}>
      <BentoGridItemUnfocused transitionStyle={transitionStyle} />
      <BentoGridItemFocused
        gridSize={gridSize}
        transitionStyle={transitionStyle}
      />
    </BentoGridBlockProvider>
  );
}
