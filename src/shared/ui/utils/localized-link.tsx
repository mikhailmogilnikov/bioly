"use client";

import type { Route } from "next";
import Link from "next/link";
import {
  type LocalizedPath,
  useLocalizedPath,
} from "@/shared/lib/hooks/use-path";

interface LocalizedLinkProps
  extends Omit<React.ComponentProps<typeof Link>, "href"> {
  href: LocalizedPath;
}

export function LocalizedLink({ href, ...props }: LocalizedLinkProps) {
  const { getLocalizedPath } = useLocalizedPath();

  return <Link href={getLocalizedPath(href) as Route} {...props} />;
}
