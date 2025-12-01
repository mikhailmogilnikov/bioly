import { RectangleHorizontal, RectangleVertical, Square } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { BentoBlockSize } from "../model/types";

type BentoBlockSizeProps = {
  sizes: BentoBlockSize[];
  activeSize: BentoBlockSize | undefined;
  onSelect: (size: BentoBlockSize) => void;
};

export const BentoBlockSizeSetting = ({
  sizes,
  activeSize,
  onSelect,
}: BentoBlockSizeProps) => {
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

  return (
    <div className="flex gap-2">
      {sizes.map((size) => (
        <button
          className={cn(
            "pressable flex h-10 w-full items-center justify-center rounded-full transition-colors hover:bg-foreground/5",
            activeSize === size && "bg-foreground/10 hover:bg-foreground/10"
          )}
          key={size}
          onClick={() => onSelect(size)}
          type="button"
        >
          {getIcon(size)}
        </button>
      ))}
    </div>
  );
};
