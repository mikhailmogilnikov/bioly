import { RectangleHorizontal, RectangleVertical, Square } from "lucide-react";
import { useProfile } from "@/features/editor/profile/use-profile";
import { cn } from "@/shared/lib/utils";
import { useBlockContext } from "../../grid/ui/block-context";
import { BentoBlockSize } from "../model/types";

interface BentoBlockSizeProps {
  sizes: BentoBlockSize[];
}

export const BentoBlockSizeSetting = ({ sizes }: BentoBlockSizeProps) => {
  const updateBentoBlockField = useProfile(
    (state) => state.updateBentoBlockField
  );

  const { block } = useBlockContext();

  if (!block) return null;

  const getIcon = (size: BentoBlockSize) => {
    switch (size) {
      case BentoBlockSize.FOUR_BY_ONE:
        return <RectangleHorizontal className="size-4" />;
      case BentoBlockSize.TWO_BY_TWO:
        return <Square className="size-4" strokeWidth={2.5} />;
      case BentoBlockSize.TWO_BY_FOUR:
        return <RectangleVertical className="size-6" />;
      case BentoBlockSize.FOUR_BY_TWO:
        return <RectangleHorizontal className="size-6" />;
      case BentoBlockSize.FOUR_BY_FOUR:
        return <Square className="size-6" />;
      case BentoBlockSize.DYNAMIC:
        return <Square className="size-6" />;
      default:
        return null;
    }
  };

  const handleSelectSize = (size: BentoBlockSize) => {
    if (!block.id) return;

    updateBentoBlockField(block.id, "size", size);
  };

  return (
    <div className="flex gap-2">
      {sizes.map((size) => (
        <button
          className={cn(
            "pressable flex h-10 w-full items-center justify-center rounded-full transition-colors hover:bg-foreground/5",
            block.size === size && "bg-foreground/10 hover:bg-foreground/10"
          )}
          key={size}
          onClick={() => handleSelectSize(size)}
          type="button"
        >
          {getIcon(size)}
        </button>
      ))}
    </div>
  );
};
