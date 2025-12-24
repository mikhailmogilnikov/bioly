"use client";

import clsx from "clsx";
import { type CSSProperties, type ReactNode, useRef, useState } from "react";
import { useIntersectionObserver, useIsClient } from "usehooks-ts";
import { Spoiler as SpoilerComponent } from "./spoiler-init.js";
import type { SpoilerProps } from "./types";

export const Spoiler: React.FC<
  SpoilerProps & { rootClassName?: string; spoilerFallback?: ReactNode }
> = ({ children, rootClassName, spoilerFallback, ...props }) => {
  const spanRef = useRef<HTMLElement | null>(null);
  const { ref, isIntersecting, entry } = useIntersectionObserver({
    threshold: 0,
    initialIsIntersecting: true,
  });
  const isClient = useIsClient();

  const [isOpen, setIsOpen] = useState(false);

  const width = entry?.boundingClientRect?.width ?? 0;
  const height = entry?.boundingClientRect?.height ?? 0;

  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));
  const area = width * height;
  const density =
    area > 0 ? clamp(Math.SQRT2 / Math.sqrt(area), 0.001, 0.06) : 0.045;

  const contentClass = clsx(
    "wrap-anywhere inline-block min-w-0 max-w-full align-baseline"
  );

  // Важно: прячем текст через inline-стили, чтобы не было "flash" до загрузки CSS.
  // (Например, когда `public/css/spoiler.css` или Tailwind CSS применяются чуть позже первого paint.)
  const hiddenTextStyle: CSSProperties = {
    opacity: 0,
    color: "transparent",
    textDecorationColor: "transparent",
  };

  const fallback = (
    <span
      aria-hidden="true"
      className={clsx(
        "inline-flex align-baseline",
        rootClassName,
        "min-w-0 max-w-full"
      )}
      style={{ visibility: "hidden" }}
    >
      <span className={contentClass}>{children}</span>
    </span>
  );

  if (!isClient) return fallback;

  return (
    <span
      className={clsx("relative inline-flex align-baseline", rootClassName)}
      ref={(node) => {
        ref(node);
        spanRef.current = node;
      }}
    >
      {isIntersecting ? (
        <SpoilerComponent
          density={density}
          fps={14}
          // mimicWords={false}
          hidden={!isOpen}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          revealOn={false}
          {...props}
        >
          <span
            className={contentClass}
            style={isOpen ? undefined : hiddenTextStyle}
          >
            {children}
          </span>
        </SpoilerComponent>
      ) : (
        fallback
      )}
      {isIntersecting && spoilerFallback && (
        <span className="absolute inset-0">{spoilerFallback}</span>
      )}
    </span>
  );
};
