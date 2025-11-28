import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { EditorMenu } from "./menu";

export function Editor() {
  return (
    <div>
      {createPortal(<EditorMenu />, document.body) as unknown as ReactNode}
    </div>
  );
}
