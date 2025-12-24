import { UserPageHeaderLayout } from "@/features/page/ui/header-layout";
import { EditAvatar } from "./avatar";
import { EditDescription } from "./description";
import { EditName } from "./name";
import { EditSocialMedia } from "./social-media/social-media";

export function EditorHeader() {
  return (
    <UserPageHeaderLayout>
      <EditAvatar
        blurClassName="lg:top-38 lg:left-20 lg:scale-x-210 lg:scale-y-170"
        className="size-46"
      />
      <EditName />
      <EditDescription />
      <EditSocialMedia />
    </UserPageHeaderLayout>
  );
}
