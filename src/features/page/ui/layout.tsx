import type { HTMLAttributes } from "react";

export function UserPageLayout(props: HTMLAttributes<HTMLElement>) {
  return (
    <div
      className="z-0 mx-auto mb-30 flex max-w-8xl flex-col gap-6 py-10 lg:flex-row lg:gap-20 lg:px-20 lg:py-20"
      {...props}
    />
  );
}
