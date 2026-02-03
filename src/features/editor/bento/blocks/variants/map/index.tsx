// biome-ignore-all lint/suspicious/noShadowRestrictedNames: false positive

import { MapIcon } from "lucide-react";
import { useProfile } from "@/features/editor/profile/use-profile";
import { Map, MapMarker, MarkerContent } from "@/shared/ui/kit/registry/map";
import { useBlockContext } from "../../../grid/ui/block-context";
import { MapTitle } from "./map-title";
import { getMapTheme, resolveMapTheme } from "./types";

export function BentoBlockMap() {
  const { block } = useBlockContext<"map">();
  const profileTheme = useProfile((state) => state.profile.theme.theme);

  if (!block) return null;

  const {
    theme = "auto",
    labels = true,
    interactions,
    zoom,
    title,
    titleAlign,
    latitude,
    longitude,
  } = block.properties ?? {};

  const resolvedTheme = resolveMapTheme(theme, profileTheme);
  const mapTheme = getMapTheme(resolvedTheme, labels);

  if (!(latitude && longitude && titleAlign && !Number.isNaN(zoom)))
    return (
      <div className="flex size-full items-center justify-center">
        <MapIcon className="size-10 text-foreground opacity-50" />
      </div>
    );

  return (
    <>
      <Map
        blockInteractions={!interactions}
        center={[longitude, latitude]}
        theme={mapTheme}
        zoom={zoom}
      >
        <MapMarker latitude={latitude} longitude={longitude}>
          <MarkerContent className="relative">
            <div className="relative z-1 size-8 rounded-full border-3 border-white bg-blue-500 shadow-black/60 shadow-xl" />
            <div className="absolute right-0 bottom-0 size-8 animate-ping rounded-full bg-blue-500 shadow-black/60 shadow-xl" />
          </MarkerContent>
        </MapMarker>
      </Map>
      {title ? (
        <MapTitle align={titleAlign} mapTheme={resolvedTheme} title={title} />
      ) : null}
    </>
  );
}
