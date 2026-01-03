import { useLingui } from "@lingui/react/macro";
import { AnimatePresence } from "motion/react";
// biome-ignore lint/performance/noNamespaceImport: 1
import * as m from "motion/react-m";
import {
  AuthLayout,
  AuthLayoutDescription,
  AuthLayoutHomeLink,
  AuthLayoutTitle,
} from "@/shared/ui/layouts/auth-layout";
import { useAuthContext } from "./model/provider";
import { AUTH_SCREENS_DATA } from "./model/screens";

export function AuthContent() {
  const { i18n, t } = useLingui();

  const { activeScreen, isInitialScreen } = useAuthContext();

  const { title, description, component } = AUTH_SCREENS_DATA[activeScreen];

  return (
    <AuthLayout>
      <m.div layout="position" layoutId="home-link">
        <AuthLayoutHomeLink homeLabel={t`Home`} />
      </m.div>

      <AnimatePresence mode="popLayout">
        <m.div
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          className="flex flex-col items-center justify-center gap-8"
          exit={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          initial={
            isInitialScreen
              ? false
              : { opacity: 0, y: 20, filter: "blur(10px)" }
          }
          key={activeScreen}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <AuthLayoutTitle>{i18n._(title)}</AuthLayoutTitle>
            <AuthLayoutDescription>{i18n._(description)}</AuthLayoutDescription>
          </div>

          {component && component}
        </m.div>
      </AnimatePresence>
    </AuthLayout>
  );
}
