import { Link2Off } from "lucide-react";
import Image from "next/image";
import { type ReactNode, useState } from "react";
import { useBlockContext } from "../../../grid/ui/block-context";
import type {
  BentoBlock,
  BentoBlockSize,
  BentoBlockType,
} from "../../model/types";
import {
  BentoItemLink2x2,
  BentoItemLink2x4,
  BentoItemLink4x1,
  BentoItemLink4x2,
} from "./variants";

const buildFaviconUrl = (url: URL) => {
  // Google Favicon API - высокое качество, автоматически находит лучшую иконку
  return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=256`;
};

const buildDuckDuckGoFaviconUrl = (url: URL) => {
  // DuckDuckGo Icons API - надежный fallback
  return `https://icons.duckduckgo.com/ip3/${url.hostname}.ico`;
};

const buildOgImageUrl = (url: URL) => {
  // Microlink API - получает реальные OG изображения сайтов
  return `https://api.microlink.io/?url=${encodeURIComponent(url.toString())}&screenshot=true&meta=false&embed=screenshot.url`;
};

const buildScreenshotUrl = (url: URL) => {
  // Screenshot API как fallback
  return `https://api.screenshotone.com/take?url=${encodeURIComponent(url.toString())}&viewport_width=1200&viewport_height=630&format=jpeg&access_key=demo`;
};

// Компонент для Favicon с автоматическим fallback
function FaviconImage({
  url,
  alt,
  className,
}: {
  url: URL;
  alt: string;
  className?: string;
}) {
  const [imgSrc, setImgSrc] = useState(buildFaviconUrl(url));
  const [useFallback, setUseFallback] = useState(false);

  const handleError = () => {
    if (!useFallback) {
      // Переключаемся на DuckDuckGo Icons API при ошибке
      setUseFallback(true);
      setImgSrc(buildDuckDuckGoFaviconUrl(url));
    }
  };

  return (
    <Image
      alt={alt}
      className={className}
      height={256}
      onError={handleError}
      src={imgSrc}
      width={256}
    />
  );
}

// Компонент для OG изображения с автоматическим fallback
function OGImage({
  url,
  alt,
  className,
}: {
  url: URL;
  alt: string;
  className?: string;
}) {
  const [imgSrc, setImgSrc] = useState(buildOgImageUrl(url));
  const [useFallback, setUseFallback] = useState(false);

  const handleError = () => {
    if (!useFallback) {
      // Переключаемся на Screenshot API при ошибке
      setUseFallback(true);
      setImgSrc(buildScreenshotUrl(url));
    }
  };

  return (
    <Image
      alt={alt}
      className={className}
      height={256}
      onError={handleError}
      src={imgSrc}
      width={256}
    />
  );
}

export function BentoBlockLink() {
  const { block } = useBlockContext();
  const linkBlock = block as BentoBlock<typeof BentoBlockType.LINK>;

  if (!linkBlock) return null;
  if (!linkBlock.properties.url_valid)
    return (
      <div className="flex size-full items-center justify-center">
        <Link2Off className="size-14 text-foreground opacity-50" />
      </div>
    );

  const url = new URL(linkBlock.properties.url);

  const faviconImg = (
    <FaviconImage
      alt={linkBlock.properties.title}
      className="size-full"
      url={url}
    />
  );

  const ogImage = (
    <OGImage
      alt={linkBlock.properties.title}
      className="size-full object-cover"
      url={url}
    />
  );

  const getComponent = (size: BentoBlockSize) => {
    const components: Record<BentoBlockSize, ReactNode> = {
      dynamic: null,
      "4x1": (
        <BentoItemLink4x1
          faviconImg={faviconImg}
          title={linkBlock.properties.title}
          url={url}
        />
      ),
      "2x2": (
        <BentoItemLink2x2
          faviconImg={faviconImg}
          title={linkBlock.properties.title}
          url={url}
        />
      ),
      "2x4": (
        <BentoItemLink2x4
          faviconImg={faviconImg}
          ogImg={ogImage}
          title={linkBlock.properties.title}
          url={url}
        />
      ),
      "4x2": (
        <BentoItemLink4x2
          faviconImg={faviconImg}
          ogImg={ogImage}
          title={linkBlock.properties.title}
          url={url}
        />
      ),
      "4x4": (
        <BentoItemLink2x4
          faviconImg={faviconImg}
          ogImg={ogImage}
          title={linkBlock.properties.title}
          url={url}
        />
      ),
    };

    return components[size];
  };

  return (
    <div className="group relative flex size-full flex-col justify-between gap-4 overflow-hidden p-4">
      {getComponent(linkBlock.size)}
    </div>
  );
}
