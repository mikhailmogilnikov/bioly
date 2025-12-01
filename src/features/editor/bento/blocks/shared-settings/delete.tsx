import { Trans } from "@lingui/react/macro";
import { useRef } from "react";
import { useProfile } from "@/features/editor/profile/use-profile";
import {
  DeleteIcon,
  type DeleteIconHandle,
} from "@/shared/ui/animated-icons/delete";

type BentoBlockDeleteProps = {
  id: string;
  onDelete: () => void;
};

export const BentoBlockDeleteSetting = ({
  id,
  onDelete,
}: BentoBlockDeleteProps) => {
  const removeBentoBlock = useProfile((state) => state.removeBentoBlock);

  const deleteIconRef = useRef<DeleteIconHandle>(null);

  const handleDelete = () => {
    onDelete();

    setTimeout(() => {
      removeBentoBlock(id);
    }, 300);
  };

  return (
    <button
      className="flex h-10 w-full items-center justify-center gap-1.5 rounded-full bg-foreground/5 font-medium text-danger"
      onClick={handleDelete}
      onPointerEnter={() => deleteIconRef.current?.startAnimation()}
      onPointerLeave={() => deleteIconRef.current?.stopAnimation()}
      type="button"
    >
      <DeleteIcon className="mb-0.5" ref={deleteIconRef} size={16} />
      <Trans>Delete</Trans>
    </button>
  );
};
