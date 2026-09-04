export interface LoveSlide {
  id: number;
  image: string;
  alt: string;
  author: string;
  title: string;
  nickname: string;
  message: string;
  spotifyUrl?: string;
  spotifyLabel?: string;
  /** Per-photo focal point so faces stay visible behind the text overlay. */
  objectPosition?: string;
}

export interface MemoryItem {
  id: number;
  image: string;
  alt: string;
  caption: string;
  objectPosition?: string;
}
