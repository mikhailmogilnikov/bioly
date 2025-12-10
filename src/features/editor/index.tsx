import { StrictMode } from "react";
import { createPortal } from "react-dom";
import { FullscreenFallback } from "@/shared/ui/kit/fullscreen-fallback";
import { EditorBento } from "./bento";
import { EditorHeader } from "./header";
import { EditorMenu } from "./menu";
import { useInitEditor } from "./use-init-editor";

export function Editor() {
  const { isEditorLoading } = useInitEditor();

  if (isEditorLoading) {
    return <FullscreenFallback />;
  }

  return (
    <div
      className="z-0 mx-auto mb-30 flex max-w-8xl flex-col gap-6 py-10 lg:flex-row lg:gap-20 lg:px-20 lg:py-20"
      id="editor"
    >
      <StrictMode>
        <EditorHeader />
      </StrictMode>
      <EditorBento />
      <StrictMode>{createPortal(<EditorMenu />, document.body)}</StrictMode>
    </div>
  );
}
