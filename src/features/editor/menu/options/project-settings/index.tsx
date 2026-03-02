import { useRef } from "react";
import { ModalViewsProvider } from "@/shared/lib/providers/modal-views/modal-views-provider";
import { AdaptiveModal } from "@/shared/ui/kit/overlays/adaptive-modal";
import { ProjectSettingsController } from "./controller";

export type ProjectSettingsViews =
  | "settings"
  | "theme"
  | "theme-header"
  | "change-slug"
  | "accessibility";

interface ProjectSettingsProps {
  initialView?: ProjectSettingsViews;
  onOpenChange: () => void;
  open: boolean;
}

export function ProjectSettingsModal({
  open,
  onOpenChange,
  initialView = "settings",
}: ProjectSettingsProps) {
  const openIdRef = useRef(0);
  const lastKeyRef = useRef(`${initialView}-0`);

  if (open) {
    openIdRef.current += 1;
    lastKeyRef.current = `${initialView}-${openIdRef.current}`;
  }

  return (
    <AdaptiveModal onOpenChange={onOpenChange} open={open}>
      <ModalViewsProvider<ProjectSettingsViews>
        initialView={initialView}
        key={lastKeyRef.current}
      >
        <ProjectSettingsController />
      </ModalViewsProvider>
    </AdaptiveModal>
  );
}
