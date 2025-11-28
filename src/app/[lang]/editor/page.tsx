"use client";

import dynamic from "next/dynamic";

const DynamicEditor = dynamic(
  () => import("@/features/editor").then((mod) => mod.Editor),
  { ssr: false }
);

export default function EditorPage() {
  return <DynamicEditor />;
}
