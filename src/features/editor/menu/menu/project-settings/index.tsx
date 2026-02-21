import { ModalViewsProvider } from "@/shared/lib/providers/modal-views/modal-views-provider";
import { AdaptiveModal } from "@/shared/ui/kit/overlays/adaptive-modal";
import { ProjectSettingsController } from "./controller";

export type ProjectSettingsViews =
  | "settings"
  | "theme"
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
  return (
    <AdaptiveModal onOpenChange={onOpenChange} open={open}>
      <ModalViewsProvider<ProjectSettingsViews>
        initialView={initialView}
        key={open ? initialView : "closed"}
      >
        <ProjectSettingsController />
      </ModalViewsProvider>
    </AdaptiveModal>
  );
}
