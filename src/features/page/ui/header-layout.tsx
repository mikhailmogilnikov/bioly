import type { HTMLAttributes } from "react";

export function UserPageHeaderLayout(props: HTMLAttributes<HTMLElement>) {
  return (
    <header
      className="flex w-full flex-col items-start gap-4 max-lg:mx-auto max-lg:max-w-116 max-lg:px-4 lg:sticky lg:top-20 lg:h-fit lg:max-w-120"
      {...props}
    />
  );
}
