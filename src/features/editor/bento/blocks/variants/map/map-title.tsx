import { cn } from "@/shared/lib/utils";
import type { BentoBlockMapThemes, BentoBlockMapTitleAlign } from "./types";

export function MapTitle({
  title,
  mapTheme,
  align = "bottom-left",
}: {
  title: string;
  mapTheme: BentoBlockMapThemes;
  align?: BentoBlockMapTitleAlign;
}) {
  return (
    <div
      className={cn(
        "absolute w-fit max-w-[calc(100%-1.25rem)] rounded-full px-2 py-1 backdrop-blur-lg",
        {
          "bottom-2.5 left-2.5": align === "bottom-left",
          "right-2.5 bottom-2.5": align === "bottom-right",
          "top-2.5 left-2.5": align === "top-left",
          "top-2.5 right-2.5": align === "top-right",
          "bg-white/30": mapTheme === "light" || mapTheme === "positron",
          "bg-black/30": mapTheme === "dark",
        }
      )}
    >
      <p
        className={cn(
          "wrap-break-word line-clamp-2 font-medium text-white text-xs",
          {
            "text-start": align === "bottom-left" || align === "top-left",
            "text-end": align === "bottom-right" || align === "top-right",
            "text-white/75": mapTheme === "dark",
            "text-black/75": mapTheme === "light" || mapTheme === "positron",
          }
        )}
      >
        {title}
      </p>
    </div>
  );
}
