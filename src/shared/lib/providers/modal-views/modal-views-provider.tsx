/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: empty block statements are allowed */

import { createContext, useContext, useState } from "react";

interface ModalViewsContextType<Views extends string> {
  views: Views[];
  push: (view: Views) => void;
  pop: (steps?: number) => void;
  replace: (view: Views) => void;
  clear: () => void;
  clearAndPush: (view: Views) => void;
  isFirstView: boolean;
}

// biome-ignore lint/suspicious/noExplicitAny: any is used to avoid type errors
const ModalViewsContext = createContext<ModalViewsContextType<any>>({
  views: [],
  push: () => {},
  pop: () => {},
  clear: () => {},
  clearAndPush: () => {},
  replace: () => {},
  isFirstView: true,
});

export function ModalViewsProvider<Views extends string>({
  children,
  initialView,
}: {
  children: React.ReactNode;
  initialView: Views;
}) {
  const [views, setViews] = useState<Views[]>([initialView]);

  const push = (view: Views) => {
    setViews((prev) => [...prev, view]);
  };

  const pop = (steps = 1) => {
    setViews((prev) => prev.slice(0, -steps));
  };

  const replace = (view: Views) => {
    setViews((prev) => [...prev.slice(0, -1), view]);
  };

  const clear = () => {
    setViews([]);
  };

  const clearAndPush = (view: Views) => {
    clear();
    push(view);
  };

  const isFirstView = views.length === 1;

  return (
    <ModalViewsContext.Provider
      value={{ views, push, pop, replace, clear, clearAndPush, isFirstView }}
    >
      {children}
    </ModalViewsContext.Provider>
  );
}

export function useModalViews<Views extends string>() {
  const context = useContext(
    ModalViewsContext
  ) as unknown as ModalViewsContextType<Views>;

  if (!context) {
    throw new Error("useModalViews must be used within a ModalViewsProvider");
  }

  return context;
}
