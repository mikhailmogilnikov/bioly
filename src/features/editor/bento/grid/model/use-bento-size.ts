import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "usehooks-ts";

export const useBentoSize = () => {
  const { width = 0 } = useWindowSize({
    debounceDelay: 300,
  });

  const sizerRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState<number | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: we only want to re-run the effect when the width changes
  useEffect(() => {
    if (sizerRef.current) {
      setSize(sizerRef.current.clientWidth - 16);
    }
  }, [width]);

  return { sizerRef, size };
};
