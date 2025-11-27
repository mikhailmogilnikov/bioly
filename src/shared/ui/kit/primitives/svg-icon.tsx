import type { ComponentProps } from "react";

import BlueskySvg from "@/shared/assets/icons/social-media-icons/bluesky.svg?raw";
import DiscordSvg from "@/shared/assets/icons/social-media-icons/discord.svg?raw";
import DribbbleSvg from "@/shared/assets/icons/social-media-icons/dribbble.svg?raw";
import FacebookSvg from "@/shared/assets/icons/social-media-icons/facebook.svg?raw";
import GithubSvg from "@/shared/assets/icons/social-media-icons/github.svg?raw";
import InstagramSvg from "@/shared/assets/icons/social-media-icons/instagram.svg?raw";
import LinkedinSvg from "@/shared/assets/icons/social-media-icons/linkedin.svg?raw";
import MediumSvg from "@/shared/assets/icons/social-media-icons/medium.svg?raw";
import MessengerSvg from "@/shared/assets/icons/social-media-icons/messenger.svg?raw";
import PinterestSvg from "@/shared/assets/icons/social-media-icons/pinterest.svg?raw";
import RedditSvg from "@/shared/assets/icons/social-media-icons/reddit.svg?raw";
import SnapchatSvg from "@/shared/assets/icons/social-media-icons/snapchat.svg?raw";
import SpotifySvg from "@/shared/assets/icons/social-media-icons/spotify.svg?raw";
import TelegramSvg from "@/shared/assets/icons/social-media-icons/telegram.svg?raw";
import ThreadsSvg from "@/shared/assets/icons/social-media-icons/threads.svg?raw";
import TiktokSvg from "@/shared/assets/icons/social-media-icons/tiktok.svg?raw";
import TumblrSvg from "@/shared/assets/icons/social-media-icons/tumblr.svg?raw";
import TwitchSvg from "@/shared/assets/icons/social-media-icons/twitch.svg?raw";
import VkSvg from "@/shared/assets/icons/social-media-icons/vk.svg?raw";
import WhatsappSvg from "@/shared/assets/icons/social-media-icons/whatsapp.svg?raw";
import XSvg from "@/shared/assets/icons/social-media-icons/x.svg?raw";
import YoutubeSvg from "@/shared/assets/icons/social-media-icons/youtube.svg?raw";
import type { SocialMediaPlatform } from "@/shared/domain/social-media";

const iconMap: Record<SocialMediaPlatform, string> = {
  bluesky: BlueskySvg,
  discord: DiscordSvg,
  dribbble: DribbbleSvg,
  facebook: FacebookSvg,
  github: GithubSvg,
  instagram: InstagramSvg,
  linkedin: LinkedinSvg,
  medium: MediumSvg,
  messenger: MessengerSvg,
  pinterest: PinterestSvg,
  reddit: RedditSvg,
  snapchat: SnapchatSvg,
  spotify: SpotifySvg,
  threads: ThreadsSvg,
  tiktok: TiktokSvg,
  tumblr: TumblrSvg,
  twitch: TwitchSvg,
  vk: VkSvg,
  whatsapp: WhatsappSvg,
  x: XSvg,
  youtube: YoutubeSvg,
  telegram: TelegramSvg,
};

interface SvgIconProps extends ComponentProps<"div"> {
  icon: `${SocialMediaPlatform}`;
}

export function SvgIcon({ icon, className, ...props }: SvgIconProps) {
  const svgContent = iconMap[icon as SocialMediaPlatform];

  if (!svgContent) {
    return null;
  }

  return (
    <div
      className={className}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>1
      dangerouslySetInnerHTML={{ __html: svgContent }}
      {...props}
    />
  );
}
