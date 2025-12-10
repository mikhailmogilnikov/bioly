import { redirect } from "next/navigation";

export const validateUserPageParams = async (
  paramsPromise: PageProps<"/[[...slug]]">["params"]
) => {
  const params = await paramsPromise;
  const slug = params?.slug;

  if (!slug || slug.length === 0) {
    return redirect("/404");
  }

  const username = slug[0];

  if (!username || username.length < 3 || username.length > 30) {
    return redirect("/404");
  }

  return username;
};
