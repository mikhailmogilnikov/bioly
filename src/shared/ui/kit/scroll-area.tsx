import {
  type ScrollAreaClassNames,
  ScrollArea as ScrollAreaComponent,
  type ScrollAreaProps as ScrollAreaPropsComponent,
} from "@blur-ui/scroll-area";

export type ScrollAreaProps = ScrollAreaPropsComponent;

import { cn } from "@/shared/lib/utils";

export function ScrollArea(props: ScrollAreaProps) {
  const { classNames, children, ...rest } = props;

  const componentClassNames: ScrollAreaClassNames = {
    root: cn(classNames?.root),
    scrollbar: cn(
      "user-select-none data-[state=hidden]:motion-opacity-out-0 data-[state=visible]:motion-opacity-in-0 pointer-events-auto p-px",
      classNames?.scrollbar
    ),
    verticalScrollbar: cn("w-2", classNames?.verticalScrollbar),
    horizontalScrollbar: cn("h-2", classNames?.horizontalScrollbar),
    thumb: cn(
      "rounded-full bg-foreground/20 transition-colors hover:bg-foreground/40",
      classNames?.thumb
    ),
  };

  return (
    <ScrollAreaComponent
      classNames={componentClassNames}
      type="always"
      {...rest}
    >
      {children}
    </ScrollAreaComponent>
  );
}

ScrollArea.displayName = "ScrollArea";
