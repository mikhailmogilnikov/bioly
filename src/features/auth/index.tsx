"use client";

import { LazyMotion } from "motion/react";
import { AuthContent } from "./content";
import { AuthProvider } from "./model/provider";

const loadDomMax = () =>
  import("@/shared/lib/utils/motion-dom-max").then((res) => res.default);

export function Auth() {
  return (
    <LazyMotion features={loadDomMax} strict>
      <AuthProvider>
        <AuthContent />
      </AuthProvider>
    </LazyMotion>
  );
}
