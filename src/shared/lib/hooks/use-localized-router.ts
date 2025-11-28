import type { Route } from "next";
import type { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { type LocalizedPath, useLocalizedPath } from "./use-path";

export const useLocalizedRouter = () => {
  const nativeRouter = useRouter();
  const { getLocalizedPath } = useLocalizedPath();

  const push = (path: LocalizedPath, options?: NavigateOptions) => {
    nativeRouter.push(getLocalizedPath(path) as Route, options);
  };

  return {
    push,
  };
};
