"use client";

import { useIsClient } from "usehooks-ts";
import { Spoiler as SpoilerComponent } from "./spoiler-init.js";
import type { SpoilerProps } from "./types";

export const Spoiler: React.FC<SpoilerProps> = ({ children, ...props }) => {
  const isClient = useIsClient();

  if (!isClient) {
    return <span className="invisible flex">{children}</span>;
  }

  return (
    <span className="flex">
      <SpoilerComponent fps={16} {...props}>
        {children}
      </SpoilerComponent>
    </span>
  );
};
