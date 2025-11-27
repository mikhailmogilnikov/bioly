import { clsx } from "clsx";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import FocusLock from "react-focus-lock";
import { RemoveScroll } from "react-remove-scroll";

type PortalOverlayProps = {
  children: ReactNode;
  isOpen: boolean;
  overlayId?: string;
  onClose: () => void;
  onAnimationEnd?: () => void;
  className?: string;
};

export const PortalOverlay = ({
  children,
  isOpen,
  overlayId = "portal-overlay",
  onClose,
  className,
}: PortalOverlayProps) =>
  isOpen &&
  createPortal(
    <RemoveScroll forwardProps>
      <FocusLock>
        <div
          aria-modal="true"
          className={clsx("fixed inset-0 z-50", className)}
          role="dialog"
        >
          <button
            className="pressable motion-duration-300 data-[state=closed]:motion-opacity-out-0 data-[state=open]:motion-opacity-in-0 absolute top-4 right-4 z-2 flex size-12 items-center justify-center rounded-full bg-default max-sm:hidden"
            data-state={isOpen ? "open" : "closed"}
            id={overlayId}
            onClick={onClose}
            type="button"
          >
            <X className="size-6 text-foreground" />
          </button>
          <button
            className="motion-duration-200 data-[state=closed]:motion-opacity-out-0 data-[state=open]:motion-opacity-in-0 absolute inset-0 z-1 bg-background/70 backdrop-blur-lg"
            data-state={isOpen ? "open" : "closed"}
            id={overlayId}
            onClick={onClose}
            type="button"
          />
          {children}
        </div>
      </FocusLock>
    </RemoveScroll>,
    document.body
  );
