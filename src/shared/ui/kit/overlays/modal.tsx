/** biome-ignore-all lint/performance/noNamespaceImport: 1 */
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { ScrollArea, type ScrollAreaProps } from "../primitives/scroll-area";

const modalTV = tv({
  slots: {
    overlay:
      "data-[state=closed]:motion-opacity-out data-[state=open]:motion-opacity-in fixed inset-0 z-50 bg-black/50",
    content:
      "-translate-x-1/2 -translate-y-1/2 data-[state=closed]:motion-scale-out-98 data-[state=closed]:motion-opacity-out data-[state=open]:motion-scale-in-98 motion-duration-200 data-[state=open]:motion-opacity-in fixed top-1/2 left-1/2 z-50 flex h-auto min-h-16 w-full flex-col rounded border border-outline bg-background",
    close:
      "absolute top-6 right-6 z-30 flex size-8 cursor-pointer items-center justify-center rounded-full bg-default",
    closeIcon: "size-5 opacity-60",
  },
  variants: {
    width: {
      md: { content: "max-w-md" },
      lg: { content: "max-w-lg" },
      xl: { content: "max-w-xl" },
      "2xl": { content: "max-w-2xl" },
      "3xl": { content: "max-w-3xl" },
      "4xl": { content: "max-w-4xl" },
      "5xl": { content: "max-w-5xl" },
      full: { content: "w-[calc(100vw-2rem)]" },
    },
    height: {
      xs: { content: "max-h-[60%]" },
      sm: { content: "max-h-[70%]" },
      md: { content: "max-h-[80%]" },
      lg: { content: "max-h-[90%]" },
      full: { content: "max-h-[calc(100vh-2rem)]" },
    },
  },
  defaultVariants: {
    width: "lg",
    height: "md",
  },
});

export type ModalVariants = VariantProps<typeof modalTV>;

export interface ModalProps extends Dialog.DialogProps, ModalVariants {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * ClassNames for modal
   */
  classNames?: {
    overlay?: string;
    content?: string;
    close?: string;
    closeIcon?: string;
  };
  /**
   * Hide close button
   */
  hideClose?: boolean;
  /**
   * Modal width
   */
  width?: ModalVariants["width"];
  /**
   * Modal height
   */
  height?: ModalVariants["height"];
}

export function Modal(props: ModalProps) {
  const { children, hideClose, classNames, width, height, ...rest } = props;

  const { content, overlay, close, closeIcon } = modalTV({ width, height });

  return (
    <Dialog.Root {...rest}>
      <Dialog.Portal container={document.getElementById("portal-root")}>
        <Dialog.Overlay
          className={overlay({ className: classNames?.overlay })}
        />
        <Dialog.Content
          className={content({ className: classNames?.content })}
          onPointerDownOutside={(e) => {
            if (
              e.target instanceof Element &&
              e.target.closest("[data-sonner-toast]")
            ) {
              e.preventDefault();
            }
          }}
        >
          {!hideClose && (
            <Dialog.Close className={close({ className: classNames?.close })}>
              <X className={closeIcon({ className: classNames?.closeIcon })} />
            </Dialog.Close>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export interface ModalHeaderProps extends Dialog.DialogTitleProps {
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
  restContent?: ReactNode;
}

export function ModalHeader(props: ModalHeaderProps) {
  const { wrapperProps, restContent, ...rest } = props;

  return (
    <div className="flex shrink-0 flex-col gap-6 p-6 pr-13" {...wrapperProps}>
      <Dialog.Title {...rest} className="shrink-0 font-semibold text-2xl" />
      <VisuallyHidden asChild>
        <Dialog.Description />
      </VisuallyHidden>
      {restContent}
    </div>
  );
}

export type ModalContentProps = ScrollAreaProps;

export function ModalContent(props: ModalContentProps) {
  const { children, ...rest } = props;

  return (
    <ScrollArea
      className="mb-6 flex h-full shrink flex-col gap-6 overflow-y-auto px-6"
      classNames={{
        scrollbar: "px-1",
        verticalScrollbar: "w-3.5",
        horizontalScrollbar: "h-3.5",
      }}
      {...rest}
    >
      {children}
    </ScrollArea>
  );
}

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  cancelButton?: boolean;
}

export function ModalFooter(props: ModalFooterProps) {
  const { cancelButton = false, children, ...rest } = props;

  return (
    <div className="flex shrink-0 items-center gap-4 px-6 pb-6" {...rest}>
      {cancelButton && (
        <Dialog.Close asChild>
          <button
            className="w-full cursor-pointer rounded bg-default px-4 py-3 font-medium"
            type="button"
          >
            Cancel
          </button>
        </Dialog.Close>
      )}
      {children}
    </div>
  );
}
