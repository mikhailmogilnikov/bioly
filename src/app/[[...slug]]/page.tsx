import "@/app/css/global.user.css";

import { FONTS_MAP } from "@/shared/assets/fonts/next-fonts";
import { FONTS, type Font } from "@/shared/domain/theme";
import { cn } from "@/shared/lib/utils";
import { validateUserPageParams } from "./utils";

export const dynamic = "force-dynamic";

export default async function UserPage({
  params: paramsPromise,
}: PageProps<"/[[...slug]]">) {
  const username = await validateUserPageParams(paramsPromise);

  const font: Font = FONTS.INTER;

  return (
    <html lang="en">
      <body
        className={cn(
          "theme-purple bg-background text-foreground antialiased",
          FONTS_MAP[font].className
        )}
      >
        <h1 className="font-bold text-4xl">username: {username}</h1>
      </body>
    </html>
  );
}
