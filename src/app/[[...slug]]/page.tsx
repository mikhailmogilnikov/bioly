import { validateUserPageParams } from "./utils";

export const dynamic = "force-dynamic";

export default async function UserPage({
  params: paramsPromise,
}: PageProps<"/[[...slug]]">) {
  const username = await validateUserPageParams(paramsPromise);

  return (
    <html lang="en">
      <body className={"antialiased"}>
        <h1>username: {username}</h1>
      </body>
    </html>
  );
}
