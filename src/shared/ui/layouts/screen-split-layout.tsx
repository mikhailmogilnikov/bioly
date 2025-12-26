import { cn } from "@/shared/lib/utils";

interface ScreenSplitLayoutProps {
  children: React.ReactNode;
  childrenWrapperClassName?: string;
  sideContent: React.ReactNode;
  sideWrapperClassName?: string;
}

export function ScreenSplitLayout({
  children,
  childrenWrapperClassName,
  sideContent,
  sideWrapperClassName,
}: ScreenSplitLayoutProps) {
  return (
    <main className="flex md:min-h-screen">
      <section
        className={cn(
          "box-border w-full min-w-md max-md:min-w-0",
          childrenWrapperClassName
        )}
      >
        {children}
      </section>
      <section
        className={cn(
          "pointer-events-none relative box-border w-full select-none overflow-hidden max-md:hidden",
          sideWrapperClassName
        )}
      >
        {sideContent}
      </section>
    </main>
  );
}
