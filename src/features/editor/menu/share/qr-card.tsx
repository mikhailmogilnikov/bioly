import Image from "next/image";
import { buildUrl } from "@/shared/lib/utils/build-url";
import { QrCode } from "@/shared/ui/kit/primitives/qr-code";
import { useProfile } from "../../profile/use-profile";

export function QrCard() {
  const { name, avatar_url, slug } = useProfile(
    (state) => ({
      name: state.profile.name,
      avatar_url: state.profile.avatar_url,
      slug: state.profile.slug,
    }),
    "shallow"
  );

  return (
    <div
      className="flex w-fit items-center justify-center bg-background"
      id="qr-root"
    >
      <div
        className="flex w-full max-w-70 flex-col items-center justify-center gap-4 rounded p-3"
        style={{ backgroundColor: "var(--color-white)" }}
      >
        {avatar_url && (
          <Image
            alt="logo"
            className="size-26 rounded-[52px]"
            height={104}
            src={avatar_url}
            width={104}
          />
        )}
        {name && (
          <p className="text-center font-bold text-2xl text-black">{name}</p>
        )}
        <div className="w-full">
          <QrCode url={buildUrl(slug)} />
        </div>
        {slug && (
          <div className="flex items-center gap-2">
            <p className="break-all text-center font-semibold text-base text-black">
              {buildUrl(slug, { withoutHttps: true })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
