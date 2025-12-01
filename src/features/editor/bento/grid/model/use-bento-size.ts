import { useEffect } from "react";
import { useWindowSize } from "usehooks-ts";
import { useBentoStore } from "./use-bento-store";

export const useBentoSize = () => {
  const { sizerRef, setGridSize } = useBentoStore(
    (state) => ({
      sizerRef: state.sizerRef,
      setGridSize: state.setGridSize,
    }),
    "shallow"
  );

  const { width = 0 } = useWindowSize({
    debounceDelay: 300,
  });

  useEffect(() => {
    if (sizerRef.current && width > 16) {
      setGridSize(sizerRef.current.clientWidth - 16);
    } else {
      setGridSize(null);
    }
  }, [width, setGridSize, sizerRef]);
};
