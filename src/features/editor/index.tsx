import { StrictMode } from "react";
import { createPortal } from "react-dom";
import { FullscreenFallback } from "@/shared/ui/kit/fullscreen-fallback";
import { UserPageLayout } from "../page/ui/layout";
import { EditorBento } from "./bento";
import { EditorHeader } from "./header";
import { EditorMenu } from "./menu";
import { EditorSettingsModalProvider } from "./menu/options/project-settings/settings-modal-context";
import { useInitEditor } from "./use-init-editor";

export function Editor() {
  const { isEditorLoading } = useInitEditor();

  if (isEditorLoading) {
    return <FullscreenFallback />;
  }

  return (
    <EditorSettingsModalProvider>
      <UserPageLayout id="editor">
        <StrictMode>
          <EditorHeader />
        </StrictMode>
        <EditorBento />
        <StrictMode>{createPortal(<EditorMenu />, document.body)}</StrictMode>
      </UserPageLayout>
    </EditorSettingsModalProvider>
  );
}
