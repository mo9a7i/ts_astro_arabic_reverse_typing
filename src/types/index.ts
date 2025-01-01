export interface Config {
  site_title: string;
  site_description: string;
  site_author: string;
  author_twitter: string;
  site_locale: string;
  site_og_image: string;
  site_url: string;
  discord_servers_invites: string[];
  youtube_videos: YouTubeVideo[];
  keywords: string[];
}

export interface YouTubeVideo {
  title: string;
  url: string;
  thumbnail: string;
}

export interface ClipboardState {
  isCopied: boolean;
  isError: boolean;
  message: string;
} 