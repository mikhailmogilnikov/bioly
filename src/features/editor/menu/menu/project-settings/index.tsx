import { ModalViewsProvider } from "@/shared/lib/providers/modal-views/modal-views-provider";
import { AdaptiveModal } from "@/shared/ui/kit/overlays/adaptive-modal";
import { ProjectSettingsController } from "./controller";

interface ProjectSettingsProps {
  open: boolean;
  onOpenChange: () => void;
}

export type ProjectSettingsViews = "settings";

export function ProjectSettingsModal({
  open,
  onOpenChange,
}: ProjectSettingsProps) {
  return (
    <AdaptiveModal onOpenChange={onOpenChange} open={open}>
      <ModalViewsProvider<ProjectSettingsViews> initialView="settings">
        <ProjectSettingsController />
      </ModalViewsProvider>
    </AdaptiveModal>
  );
}
