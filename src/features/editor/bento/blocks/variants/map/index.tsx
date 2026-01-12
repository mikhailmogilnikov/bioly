// biome-ignore-all lint/suspicious/noShadowRestrictedNames: false positive
import { Map, MapMarker, MarkerContent } from "@/shared/ui/kit/registry/map";
import { useBlockContext } from "../../../grid/ui/block-context";
import { getMapTheme } from "./types";

export function BentoBlockMap() {
  const { block } = useBlockContext<"map">();

  if (!block) return null;

  const { theme, labels } = block.properties;

  return (
    <Map
      blockInteractions
      center={[-74.006, 40.7128]}
      theme={getMapTheme(theme, labels)}
      zoom={16}
    >
      <MapMarker latitude={40.7128} longitude={-74.006}>
        <MarkerContent className="relative">
          <div className="relative z-1 size-8 rounded-full border-3 border-white bg-blue-500 shadow-black/60 shadow-xl" />
          <div className="absolute right-0 bottom-0 size-8 animate-ping rounded-full bg-blue-500 shadow-black/60 shadow-xl" />
        </MarkerContent>
      </MapMarker>
    </Map>
  );
}
