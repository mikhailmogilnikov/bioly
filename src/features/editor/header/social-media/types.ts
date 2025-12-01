export const SocialMediaPlatforms = {
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

type SocialMediaItemInner = {
  name: string;
  icon: string;
  url: string;
};

export type SocialMediaPlatform =
  (typeof SocialMediaPlatforms)[keyof typeof SocialMediaPlatforms];

export type SocialMediaItem = {
  platform: SocialMediaPlatform;
  slug: string;
  order: number;
};

export const SocialMedia: Record<SocialMediaPlatform, SocialMediaItemInner> = {
  [SocialMediaPlatforms.BLUESKY]: {
    name: "Bluesky",
    icon: "bluesky",
    url: "https://bsky.app/profile/",
  },
  [SocialMediaPlatforms.TELEGRAM]: {
    name: "Telegram",
    icon: "telegram",
    url: "https://t.me/",
  },
  [SocialMediaPlatforms.DISCORD]: {
    name: "Discord",
    icon: "discord",
    url: "https://discord.com/users/",
  },
  [SocialMediaPlatforms.DRIBBBLE]: {
    name: "Dribbble",
    icon: "dribbble",
    url: "https://dribbble.com/",
  },
  [SocialMediaPlatforms.FACEBOOK]: {
    name: "Facebook",
    icon: "facebook",
    url: "https://facebook.com/",
  },
  [SocialMediaPlatforms.GITHUB]: {
    name: "GitHub",
    icon: "github",
    url: "https://github.com/",
  },
  [SocialMediaPlatforms.INSTAGRAM]: {
    name: "Instagram",
    icon: "instagram",
    url: "https://instagram.com/",
  },
  [SocialMediaPlatforms.LINKEDIN]: {
    name: "LinkedIn",
    icon: "linkedin",
    url: "https://linkedin.com/in/",
  },
  [SocialMediaPlatforms.MEDIUM]: {
    name: "Medium",
    icon: "medium",
    url: "https://medium.com/@",
  },
  [SocialMediaPlatforms.MESSENGER]: {
    name: "Messenger",
    icon: "messenger",
    url: "https://m.me/",
  },
  [SocialMediaPlatforms.PINTEREST]: {
    name: "Pinterest",
    icon: "pinterest",
    url: "https://pinterest.com/",
  },
  [SocialMediaPlatforms.REDDIT]: {
    name: "Reddit",
    icon: "reddit",
    url: "https://reddit.com/user/",
  },
  [SocialMediaPlatforms.SNAPCHAT]: {
    name: "Snapchat",
    icon: "snapchat",
    url: "https://snapchat.com/add/",
  },
  [SocialMediaPlatforms.SPOTIFY]: {
    name: "Spotify",
    icon: "spotify",
    url: "https://open.spotify.com/user/",
  },
  [SocialMediaPlatforms.THREADS]: {
    name: "Threads",
    icon: "threads",
    url: "https://threads.net/@",
  },
  [SocialMediaPlatforms.TIKTOK]: {
    name: "TikTok",
    icon: "tiktok",
    url: "https://tiktok.com/@",
  },
  [SocialMediaPlatforms.TUMBLR]: {
    name: "Tumblr",
    icon: "tumblr",
    url: "https://tumblr.com/",
  },
  [SocialMediaPlatforms.TWITCH]: {
    name: "Twitch",
    icon: "twitch",
    url: "https://twitch.tv/",
  },
  [SocialMediaPlatforms.VK]: {
    name: "VK",
    icon: "vk",
    url: "https://vk.com/",
  },
  [SocialMediaPlatforms.WHATSAPP]: {
    name: "WhatsApp",
    icon: "whatsapp",
    url: "https://wa.me/",
  },
  [SocialMediaPlatforms.X]: {
    name: "X",
    icon: "x",
    url: "https://x.com/",
  },
  [SocialMediaPlatforms.YOUTUBE]: {
    name: "YouTube",
    icon: "youtube",
    url: "https://youtube.com/@",
  },
} as const;
