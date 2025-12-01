import LinkIcon from "@/shared/assets/icons/link.svg";

export function FullscreenFallback() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <LinkIcon className="size-16 animate-pulse text-foreground" />
    </div>
  );
}
