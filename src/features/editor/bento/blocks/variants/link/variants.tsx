import { ArrowUpRightIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

type BentoItemLinkFaviconProps = {
  faviconImg: ReactNode;
  faviconLightClassName?: string;
  arrowUpRightClassName?: string;
};

const BentoItemDefaultAbsoluteItems = ({
  faviconImg,
  faviconLightClassName,
  arrowUpRightClassName,
}: BentoItemLinkFaviconProps) => (
  <>
    <div
      className={cn(
        "pointer-events-none absolute top-7 left-7 z-0 flex size-24 items-center justify-center opacity-30 blur-xl",
        faviconLightClassName
      )}
    >
      {faviconImg}
    </div>

    <div
      className={cn(
        "group-hover:-translate-y-0.5 absolute top-4 right-4 z-10 duration-300 group-hover:translate-x-0.5 group-hover:text-link",
        arrowUpRightClassName
      )}
    >
      <ArrowUpRightIcon className="size-7" />
    </div>
  </>
);

interface BentoItemLinkDefaultProps extends BentoItemLinkFaviconProps {
  title: string;
  url: URL;
}

export function BentoItemLink4x1({
  faviconImg,
  title,
  url,
}: BentoItemLinkDefaultProps) {
  return (
    <>
      <BentoItemDefaultAbsoluteItems
        faviconImg={faviconImg}
        faviconLightClassName="left-14 top-8"
      />
      <div className="flex h-full gap-3">
        <div className="z-10 flex aspect-square h-full shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-outline bg-background/50">
          {faviconImg}
        </div>

        <div className="z-10 mr-6 flex flex-col justify-center gap-1">
          <h6 className="line-clamp-2 text-start font-medium text-base">
            {title || url.hostname}
          </h6>
          <p className="text-start text-foreground/50 text-sm">
            {url.hostname}
          </p>
        </div>
      </div>
    </>
  );
}

export function BentoItemLink2x2({
  faviconImg,
  title,
  url,
}: BentoItemLinkDefaultProps) {
  return (
    <>
      <BentoItemDefaultAbsoluteItems faviconImg={faviconImg} />

      <div className="flex h-full flex-col justify-between gap-3">
        <div className="z-10 flex size-18 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-outline bg-background/50">
          {faviconImg}
        </div>

        <div className="z-10 flex flex-col gap-1">
          <h6 className="line-clamp-2 text-start font-medium text-base">
            {title || url.hostname}
          </h6>
          <p className="text-start text-foreground/50 text-sm">
            {url.hostname}
          </p>
        </div>
      </div>
    </>
  );
}

interface BentoItemLinkOgProps extends BentoItemLinkDefaultProps {
  ogImg: ReactNode;
}

export function BentoItemLink2x4({
  faviconImg,
  title,
  url,
  ogImg,
}: BentoItemLinkOgProps) {
  return (
    <>
      <BentoItemDefaultAbsoluteItems faviconImg={faviconImg} />

      <div className="flex flex-col gap-3">
        <div className="z-10 flex size-18 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-outline bg-background/50">
          {faviconImg}
        </div>

        <div className="z-10 flex flex-col gap-1">
          <h6 className="line-clamp-2 text-start font-medium text-base">
            {title || url.hostname}
          </h6>
          <p className="text-start text-foreground/50 text-sm">
            {url.hostname}
          </p>
        </div>
      </div>

      <div className="aspect-[1.91/1] overflow-hidden rounded-xl border border-outline">
        {ogImg}
      </div>
    </>
  );
}

export function BentoItemLink4x2({
  faviconImg,
  title,
  url,
  ogImg,
}: BentoItemLinkOgProps) {
  return (
    <>
      <BentoItemDefaultAbsoluteItems
        arrowUpRightClassName="bg-black/10 text-white rounded-full p-1 backdrop-blur-lg top-2 right-2 border border-white/10 hidden"
        faviconImg={faviconImg}
      />

      <div className="flex h-full gap-8">
        <div className="flex h-full w-[40%] flex-col justify-between gap-3">
          <div className="z-10 flex size-18 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-outline bg-background/50">
            {faviconImg}
          </div>

          <div className="z-10 flex flex-col gap-1">
            <h6 className="line-clamp-2 text-start font-medium text-base">
              {title || url.hostname}
            </h6>
            <p className="text-start text-foreground/50 text-sm">
              {url.hostname}
            </p>
          </div>
        </div>

        <div className="aspect-[1.91/1] w-full overflow-hidden rounded-xl border border-outline">
          {ogImg}
        </div>
      </div>
    </>
  );
}
