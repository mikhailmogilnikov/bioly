import LinkIcon from "@/shared/assets/icons/link.svg";
import { cn } from "@/shared/lib/utils";
import { LocalizedLink } from "../utils/localized-link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <section className="mx-auto flex w-full max-w-md flex-col items-center justify-center gap-8 px-4 text-center max-md:pt-8 md:min-h-screen">
      {children}
    </section>
  );
}

export function AuthLayoutTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="font-semibold text-xl">{children}</h1>;
}

export function AuthLayoutDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="font-medium text-foreground/50 text-sm">{children}</p>;
}

export function AuthLayoutHomeLink({
  homeLabel,
  className,
}: {
  homeLabel: string;
  className?: string;
}) {
  return (
    <div className={cn("squircle size-16 bg-default", className)}>
      <LocalizedLink
        aria-label={homeLabel}
        className="flex size-full items-center justify-center"
        href="/"
      >
        <LinkIcon className="size-9 text-link" />
      </LocalizedLink>
    </div>
  );
}
