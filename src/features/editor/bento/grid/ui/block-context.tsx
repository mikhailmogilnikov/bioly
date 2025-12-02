/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: we need to close the block wrapper, panel and overlay */
import { createContext, useCallback, useContext, useState } from "react";
import type { BentoBlock, BentoBlockTypeKey } from "../../blocks/model/types";

export const BentoGridBlockContext = createContext<{
  id: string | null;
  block: BentoBlock<BentoBlockTypeKey> | null;
  isFocused: boolean;
  handleBlockFocus: () => void;
  handleBlockUnfocus: () => void;
  closeBlockWrapper: () => void;
  closeBlockPanel: () => void;
  closeBlockOverlay: () => void;
}>({
  id: null,
  block: null,
  isFocused: false,
  handleBlockFocus: () => {},
  handleBlockUnfocus: () => {},
  closeBlockWrapper: () => {},
  closeBlockPanel: () => {},
  closeBlockOverlay: () => {},
});

type BentoGridBlockProviderProps = {
  children: React.ReactNode;
  id: string;
  block: BentoBlock<BentoBlockTypeKey>;
};

export const BentoGridBlockProvider = ({
  children,
  id,
  block,
}: BentoGridBlockProviderProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleBlockFocus = () => {
    setIsFocused(true);
  };

  const handleBlockUnfocus = () => {
    setIsFocused(false);
  };

  const closeBlockWrapper = useCallback(() => {
    const blockWrapper = document.getElementById(`bento-item-${id}-wrapper`);

    if (blockWrapper) {
      blockWrapper.style.opacity = "0";
      blockWrapper.style.scale = "0.5";
      blockWrapper.style.transition = "opacity 0.2s, scale 0.2s";
    }
  }, [id]);

  const closeBlockPanel = useCallback(() => {
    const panel = document.getElementById(`bento-item-${id}-panel`);

    if (panel) panel.dataset.state = "closed";
  }, [id]);

  const closeBlockOverlay = useCallback(() => {
    const overlays = document.querySelectorAll("#portal-overlay");

    if (overlays)
      for (const overlay of overlays) {
        (overlay as HTMLElement).dataset.state = "closed";
      }
  }, []);

  return (
    <BentoGridBlockContext.Provider
      value={{
        id,
        block,
        closeBlockWrapper,
        closeBlockPanel,
        closeBlockOverlay,
        isFocused,
        handleBlockFocus,
        handleBlockUnfocus,
      }}
    >
      {children}
    </BentoGridBlockContext.Provider>
  );
};

export const useBlockContext = () => {
  const context = useContext(BentoGridBlockContext);

  if (!context) {
    throw new Error(
      "useBlockContext must be used within a BentoGridBlockProvider"
    );
  }

  return context;
};
