import "@/app/css/global.user.css";
import { cn } from "@/shared/lib/utils";
import { validateUserPageParams } from "./utils";

export const dynamic = "force-dynamic";

export default async function UserPage({
  params: paramsPromise,
}: PageProps<"/[[...slug]]">) {
  const username = await validateUserPageParams(paramsPromise);

  return (
    <html lang="en">
      <body
        className={cn("theme-purple bg-background text-foreground antialiased")}
      >
        <h1 className="font-bold text-4xl">username: {username}</h1>
      </body>
    </html>
  );
}
