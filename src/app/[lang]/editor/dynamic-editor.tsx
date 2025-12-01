"use client";

import dynamic from "next/dynamic";
import { FullscreenFallback } from "@/shared/ui/kit/fullscreen-fallback";

const DynamicEditorLoader = dynamic(
  () => import("@/features/editor").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => <FullscreenFallback />,
  }
);

export function DynamicEditor() {
  return <DynamicEditorLoader />;
}
