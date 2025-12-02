import { Trans } from "@lingui/react/macro";
import { CircleQuestionMark } from "lucide-react";
import { useProfile } from "@/features/editor/profile/use-profile";
import { useBentoSize } from "../model/use-bento-size";
import { useBentoStore } from "../model/use-bento-store";

export const BentoGridRoot = ({ children }: { children: React.ReactNode }) => {
  useBentoSize();

  const { gridSize, sizerRef } = useBentoStore(
    (state) => ({
      gridSize: state.gridSize,
      sizerRef: state.sizerRef,
    }),
    "shallow"
  );

  const { bentoLength } = useProfile(
    (state) => ({
      bentoLength: state.profile.bento.length,
    }),
    "shallow"
  );

  return (
    <div className="relative w-full">
      <div
        aria-hidden="true"
        className="invisible absolute top-0 aspect-square w-full"
        id="bento-grid-sizer"
        ref={sizerRef}
      />

      {gridSize && bentoLength > 0 && children}

      {gridSize && bentoLength === 0 && (
        <div className="motion-opacity-in-0 px-2">
          <div className="squircle-outline flex gap-3 p-4">
            <CircleQuestionMark className="shrink-0 opacity-50" />
            <p className="font-medium">
              <Trans>No blocks added yet.</Trans>
              {/* No blocks added yet. Press
              <span className="font-bold text-link">+</span> Add a block in the
              bottom menu. */}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
