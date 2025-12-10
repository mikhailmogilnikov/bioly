import { redirect } from "next/navigation";

export default async function CatchAllPage() {
  return redirect("/404");
}
