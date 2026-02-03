import type { components } from "@/shared/api/schema/generated";

export const SocialMediaPlatforms: Record<
  string,
  components["schemas"]["SocialMediaPlatform"]
> = {
  INSTAGRAM: "instagram",
  TELEGRAM: "telegram",
  X: "x",
  BLUESKY: "bluesky",
  DISCORD: "discord",
  DRIBBBLE: "dribbble",
  FACEBOOK: "facebook",
  GITHUB: "github",
  LINKEDIN: "linkedin",
  TIKTOK: "tiktok",
  THREADS: "threads",
  PINTEREST: "pinterest",
  MEDIUM: "medium",
  YOUTUBE: "youtube",
  MESSENGER: "messenger",
  REDDIT: "reddit",
  SNAPCHAT: "snapchat",
  SPOTIFY: "spotify",
  TUMBLR: "tumblr",
  TWITCH: "twitch",
  VK: "vk",
  WHATSAPP: "whatsapp",
} as const;

interface SocialMediaItemInner {
  name: string;
  icon: string;
  url: string;
}

export type SocialMediaPlatform = components["schemas"]["SocialMediaPlatform"];

export type SocialMediaItem = components["schemas"]["SocialMediaItem"];

export const SocialMedia: Record<SocialMediaPlatform, SocialMediaItemInner> = {
  bluesky: {
    name: "Bluesky",
    icon: "bluesky",
    url: "https://bsky.app/profile/",
  },
  telegram: {
    name: "Telegram",
    icon: "telegram",
    url: "https://t.me/",
  },
  discord: {
    name: "Discord",
    icon: "discord",
    url: "https://discord.com/users/",
  },
  dribbble: {
    name: "Dribbble",
    icon: "dribbble",
    url: "https://dribbble.com/",
  },
  facebook: {
    name: "Facebook",
    icon: "facebook",
    url: "https://facebook.com/",
  },
  github: {
    name: "GitHub",
    icon: "github",
    url: "https://github.com/",
  },
  instagram: {
    name: "Instagram",
    icon: "instagram",
    url: "https://instagram.com/",
  },
  linkedin: {
    name: "LinkedIn",
    icon: "linkedin",
    url: "https://linkedin.com/in/",
  },
  medium: {
    name: "Medium",
    icon: "medium",
    url: "https://medium.com/@",
  },
  messenger: {
    name: "Messenger",
    icon: "messenger",
    url: "https://m.me/",
  },
  pinterest: {
    name: "Pinterest",
    icon: "pinterest",
    url: "https://pinterest.com/",
  },
  reddit: {
    name: "Reddit",
    icon: "reddit",
    url: "https://reddit.com/user/",
  },
  snapchat: {
    name: "Snapchat",
    icon: "snapchat",
    url: "https://snapchat.com/add/",
  },
  spotify: {
    name: "Spotify",
    icon: "spotify",
    url: "https://open.spotify.com/user/",
  },
  threads: {
    name: "Threads",
    icon: "threads",
    url: "https://threads.net/@",
  },
  tiktok: {
    name: "TikTok",
    icon: "tiktok",
    url: "https://tiktok.com/@",
  },
  tumblr: {
    name: "Tumblr",
    icon: "tumblr",
    url: "https://tumblr.com/",
  },
  twitch: {
    name: "Twitch",
    icon: "twitch",
    url: "https://twitch.tv/",
  },
  vk: {
    name: "VK",
    icon: "vk",
    url: "https://vk.com/",
  },
  whatsapp: {
    name: "WhatsApp",
    icon: "whatsapp",
    url: "https://wa.me/",
  },
  x: {
    name: "X",
    icon: "x",
    url: "https://x.com/",
  },
  youtube: {
    name: "YouTube",
    icon: "youtube",
    url: "https://youtube.com/@",
  },
} as const;
