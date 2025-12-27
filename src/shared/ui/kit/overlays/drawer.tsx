import type { DialogTitleProps } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { type DialogProps, Drawer as VaulDrawer } from "vaul";

import { cn } from "@/shared/lib/utils";
import { ScrollArea, type ScrollAreaProps } from "../primitives/scroll-area";

export type DrawerProps = DialogProps & {
  hideThumb?: boolean;
  hideClose?: boolean;
};

export const Drawer = (props: DrawerProps) => {
  const {
    hideThumb = false,
    hideClose = false,
    open,
    onOpenChange,
    children,
    ...rest
  } = props;

  // useUpdateThemeColor({ isOpen: open ?? false });

  return (
    <VaulDrawer.Root
      onOpenChange={onOpenChange}
      open={open}
      repositionInputs={false}
      shouldScaleBackground={false}
      {...rest}
    >
      <VaulDrawer.Portal container={document.getElementById("portal-root")}>
        <VaulDrawer.Overlay className="fixed inset-0 bg-black/60" />

        <VaulDrawer.Content className="fixed right-0 bottom-0 left-0 h-fit max-h-[95svh] rounded-t border-outline border-t bg-background outline-none focus:outline-none">
          <div className="z-10 overflow-hidden">
            {!hideThumb && (
              <div
                className="fixed top-0 right-0 left-0 flex h-6 items-center justify-center"
                id="drawer-header"
              >
                <div
                  aria-hidden
                  className="mx-auto mt-5 h-1.5 w-10 shrink-0 rounded-full bg-foreground/20"
                  id="drawer-thumb"
                />
              </div>
            )}
            {!hideClose && (
              <VaulDrawer.Close className="absolute top-4 right-4 rounded-full bg-default p-1">
                <X className="size-5 opacity-30" />
              </VaulDrawer.Close>
            )}
            <div className="z-0 flex max-h-[95svh] flex-col gap-5 overflow-y-auto pb-5">
              {children}
            </div>
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
};

export interface DrawerHeaderProps extends DialogTitleProps {
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
  restContent?: ReactNode;
}

export function DrawerHeader(props: DrawerHeaderProps) {
  const { wrapperProps, restContent, className, ...rest } = props;

  return (
    <div
      className={cn("flex shrink-0 flex-col gap-5 p-5 pb-0", className)}
      {...wrapperProps}
    >
      <VaulDrawer.Title
        {...rest}
        className="mt-5 shrink-0 font-semibold text-2xl"
      />
      <VisuallyHidden asChild>
        <VaulDrawer.Description />
      </VisuallyHidden>
      {restContent}
    </div>
  );
}

export type DrawerContentProps = ScrollAreaProps;

export function DrawerContent(props: DrawerContentProps) {
  const { children, ...rest } = props;

  return (
    <ScrollArea
      className="flex h-full shrink flex-col gap-5 overflow-y-auto px-5"
      classNames={{
        scrollbar: "px-1",
        verticalScrollbar: "w-3.5",
        horizontalScrollbar: "h-3.5",
      }}
      {...rest}
    >
      <div className="py-2" />
      {children}
    </ScrollArea>
  );
}

export interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {
  cancelButton?: boolean;
}

export function DrawerFooter(props: DrawerFooterProps) {
  const { cancelButton = false, children, ...rest } = props;

  return (
    <div className="flex shrink-0 gap-4 px-5" {...rest}>
      {cancelButton && (
        <VaulDrawer.Close asChild>
          <button
            className="w-full cursor-pointer rounded bg-default px-5 py-3 font-medium"
            type="button"
          >
            Cancel
          </button>
        </VaulDrawer.Close>
      )}
      {children}
    </div>
  );
}
