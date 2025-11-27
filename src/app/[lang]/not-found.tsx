"use client";

import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  return <div>not found page {pathname}</div>;
}
