import type { DialogTitleProps } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ChevronLeftIcon, X } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { type DialogProps, Drawer as VaulDrawer } from "vaul";
import { useModalViews } from "@/shared/lib/providers/modal-views/modal-views-provider";
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

        <VaulDrawer.Content className="fixed right-0 bottom-0 left-0 h-fit max-h-[97svh] rounded-t border-outline border-t bg-background outline-none focus:outline-none">
          <div className="z-10 overflow-hidden">
            {!hideThumb && (
              <div
                className="fixed top-0 right-0 left-0 flex h-6 items-center justify-center"
                id="drawer-header"
              >
                <div
                  aria-hidden
                  className="mx-auto mt-2 h-1.5 w-10 shrink-0 rounded-full bg-foreground/20"
                  id="drawer-thumb"
                />
              </div>
            )}
            {!hideClose && (
              <VaulDrawer.Close className="absolute top-8 right-4 z-1 rounded-full bg-default p-1">
                <X className="size-6 opacity-30" />
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
  onBack?: () => void;
}

export function DrawerHeader(props: DrawerHeaderProps) {
  const { wrapperProps, restContent, className, onBack, ...rest } = props;
  const modalViewsContext = useModalViews<string>();

  return (
    <div
      className={cn("flex w-full shrink-0 flex-col gap-5", className)}
      {...wrapperProps}
    >
      {!modalViewsContext?.isFirstView && (
        <button
          className="pressable absolute top-8 left-4 z-10 flex size-8 cursor-pointer items-center justify-center rounded-full bg-default"
          onClick={() => {
            if (onBack) {
              onBack();
            } else {
              modalViewsContext.pop();
            }
          }}
          type="button"
        >
          <ChevronLeftIcon className="size-7 opacity-30" strokeWidth={1.9} />
        </button>
      )}
      <VaulDrawer.Title
        {...rest}
        className="mx-auto mt-9 shrink-0 text-balance px-14 text-center font-semibold text-lg"
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
