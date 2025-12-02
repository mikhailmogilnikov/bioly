import { StrictMode } from "react";
import { createPortal } from "react-dom";
import { EditorBento } from "./bento";
import { EditorHeader } from "./header";
import { EditorMenu } from "./menu";

export function Editor() {
  return (
    <>
      <div
        className="mx-auto mb-30 flex max-w-8xl flex-col gap-6 py-10 lg:flex-row lg:gap-20 lg:px-20 lg:py-20"
        id="editor"
      >
        <StrictMode>
          <EditorHeader />
        </StrictMode>
        <EditorBento />
      </div>
      <StrictMode>{createPortal(<EditorMenu />, document.body)}</StrictMode>
    </>
  );
}
