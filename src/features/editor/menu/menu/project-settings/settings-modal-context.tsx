"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import type { ProjectSettingsViews } from ".";

interface SettingsModalState {
  initialView: ProjectSettingsViews;
  open: boolean;
}

interface EditorSettingsModalContextValue {
  closeSettingsModal: () => void;
  openSettingsModal: (initialView?: ProjectSettingsViews) => void;
  settingsModalState: SettingsModalState;
}

const EditorSettingsModalContext =
  createContext<EditorSettingsModalContextValue | null>(null);

export function EditorSettingsModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [settingsModalState, setSettingsModalState] =
    useState<SettingsModalState>({
      initialView: "settings",
      open: false,
    });

  const openSettingsModal = useCallback(
    (initialView: ProjectSettingsViews = "settings") => {
      setSettingsModalState({ initialView, open: true });
    },
    []
  );

  const closeSettingsModal = useCallback(() => {
    setSettingsModalState((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <EditorSettingsModalContext.Provider
      value={{
        closeSettingsModal,
        openSettingsModal,
        settingsModalState,
      }}
    >
      {children}
    </EditorSettingsModalContext.Provider>
  );
}

export function useEditorSettingsModal() {
  const context = useContext(EditorSettingsModalContext);
  if (!context) {
    throw new Error(
      "useEditorSettingsModal must be used within EditorSettingsModalProvider"
    );
  }
  return context;
}
