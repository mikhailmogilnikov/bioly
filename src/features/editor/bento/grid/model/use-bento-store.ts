import { createGStore } from "create-gstore";
import { useRef, useState } from "react";

export const useBentoStore = createGStore(() => {
  const sizerRef = useRef<HTMLDivElement>(null);

  const [gridSize, setGridSize] = useState<number | null>(null);

  return {
    sizerRef,
    gridSize,
    setGridSize,
  };
});
