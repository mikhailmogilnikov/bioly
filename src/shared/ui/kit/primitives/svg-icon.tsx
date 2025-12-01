import type { ComponentProps } from "react";
import type { SocialMediaPlatform } from "@/features/editor/header/social-media/types";
import BlueskySvg from "@/shared/assets/icons/social-media-icons/bluesky.svg";
import DiscordSvg from "@/shared/assets/icons/social-media-icons/discord.svg";
import DribbbleSvg from "@/shared/assets/icons/social-media-icons/dribbble.svg";
import FacebookSvg from "@/shared/assets/icons/social-media-icons/facebook.svg";
import GithubSvg from "@/shared/assets/icons/social-media-icons/github.svg";
import InstagramSvg from "@/shared/assets/icons/social-media-icons/instagram.svg";
import LinkedinSvg from "@/shared/assets/icons/social-media-icons/linkedin.svg";
import MediumSvg from "@/shared/assets/icons/social-media-icons/medium.svg";
import MessengerSvg from "@/shared/assets/icons/social-media-icons/messenger.svg";
import PinterestSvg from "@/shared/assets/icons/social-media-icons/pinterest.svg";
import RedditSvg from "@/shared/assets/icons/social-media-icons/reddit.svg";
import SnapchatSvg from "@/shared/assets/icons/social-media-icons/snapchat.svg";
import SpotifySvg from "@/shared/assets/icons/social-media-icons/spotify.svg";
import TelegramSvg from "@/shared/assets/icons/social-media-icons/telegram.svg";
import ThreadsSvg from "@/shared/assets/icons/social-media-icons/threads.svg";
import TiktokSvg from "@/shared/assets/icons/social-media-icons/tiktok.svg";
import TumblrSvg from "@/shared/assets/icons/social-media-icons/tumblr.svg";
import TwitchSvg from "@/shared/assets/icons/social-media-icons/twitch.svg";
import VkSvg from "@/shared/assets/icons/social-media-icons/vk.svg";
import WhatsappSvg from "@/shared/assets/icons/social-media-icons/whatsapp.svg";
import XSvg from "@/shared/assets/icons/social-media-icons/x.svg";
import YoutubeSvg from "@/shared/assets/icons/social-media-icons/youtube.svg";

const iconMap: Record<SocialMediaPlatform, React.ReactNode> = {
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
  const SvgContent = iconMap[icon as SocialMediaPlatform];

  if (!SvgContent) {
    return null;
  }

  // @ts-expect-error - SvgContent is a React component
  return <SvgContent className={className} {...props} />;
}
