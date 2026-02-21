/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: we need to close the block wrapper, panel and overlay */
import { createContext, useCallback, useContext, useState } from "react";
import type { BentoBlock, BentoBlockTypeKey } from "../../blocks/model/types";

interface BentoGridBlockContextValue<T extends BentoBlockTypeKey> {
  block: BentoBlock<T> | null;
  closeBlockOverlay: () => void;
  closeBlockPanel: () => void;
  closeBlockWrapper: () => void;
  handleBlockFocus: () => void;
  handleBlockUnfocus: () => void;
  id: string | null;
  isFocused: boolean;
}

export const BentoGridBlockContext = createContext<
  BentoGridBlockContextValue<BentoBlockTypeKey>
>({
  id: null,
  block: null,
  isFocused: false,
  handleBlockFocus: () => {},
  handleBlockUnfocus: () => {},
  closeBlockWrapper: () => {},
  closeBlockPanel: () => {},
  closeBlockOverlay: () => {},
});

interface BentoGridBlockProviderProps {
  block: BentoBlock<BentoBlockTypeKey>;
  children: React.ReactNode;
  id: string;
}

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

export const useBlockContext = <T extends BentoBlockTypeKey>() => {
  const context = useContext(BentoGridBlockContext);

  if (!context) {
    throw new Error(
      "useBlockContext must be used within a BentoGridBlockProvider"
    );
  }

  return context as BentoGridBlockContextValue<T>;
};
