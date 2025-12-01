import { EditAvatar } from "./avatar";
import { EditDescription } from "./description";
import { EditName } from "./name";
import { EditSocialMedia } from "./social-media/social-media";

export function EditorHeader() {
  return (
    <header className="motion-opacity-in-0 flex w-full flex-col items-start gap-4 max-lg:mx-auto max-lg:max-w-116 max-lg:px-4 lg:sticky lg:top-20 lg:h-fit lg:max-w-120">
      <EditAvatar
        blurClassName="lg:top-38 lg:left-20 lg:scale-x-210 lg:scale-y-170"
        className="size-46"
      />
      <EditName />
      <EditDescription />
      <EditSocialMedia />
    </header>
  );
}
