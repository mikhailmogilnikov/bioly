import "@/app/css/global.user.css";
import "@/app/css/text-editor.static.css";

import { cn } from "@/shared/lib/utils";
import { UserContent } from "./content";
import { validateUserPageParams } from "./utils";

export const revalidate = 60;

export default async function UserPage({
  params: paramsPromise,
}: PageProps<"/[[...slug]]">) {
  const username = await validateUserPageParams(paramsPromise);

  return (
    <html lang="en">
      <head>
        <script src="/scripts/init-worklet.js" />
      </head>
      <body
        className={cn("theme-dark bg-background text-foreground antialiased")}
      >
        <h1 className="font-bold text-4xl">username: {username}</h1>
        <UserContent />
      </body>
    </html>
  );
}
