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
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 bg-success" />
        <p className="font-medium text-base text-success">
          100 sdawedsadsa das asd
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 bg-warning" />
        <p className="font-medium text-base text-warning">
          100 sdawedsadsa das asd
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 bg-danger" />
        <p className="font-medium text-base text-danger">
          100 sdawedsadsa das asd
        </p>
      </div>
    </header>
  );
}
