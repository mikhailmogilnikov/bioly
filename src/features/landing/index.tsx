import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/shared/ui/kit/primitives/button";
import { LocalizedLink } from "@/shared/ui/utils/localized-link";

export function Landing() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="primary-gradient font-bold text-5xl leading-14">Bioly</h1>
      <Button asChild className="text-link" size="sm">
        <LocalizedLink href="/login">
          Continue <ArrowRightIcon className="size-4" />
        </LocalizedLink>
      </Button>
    </div>
  );
}
