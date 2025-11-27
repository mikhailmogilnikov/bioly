import { notFound } from "next/navigation";

export const validateUserPageParams = async (
  paramsPromise: PageProps<"/[[...slug]]">["params"]
) => {
  const params = await paramsPromise;
  const slug = params?.slug;

  if (!slug || slug.length === 0) {
    return notFound();
  }

  const username = slug[0];

  if (!username || username.length < 3 || username.length > 30) {
    console.log("not found");
    return notFound();
  }

  return username;
};
