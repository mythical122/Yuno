import { Music } from 'lucide-react';

interface SpotifyButtonProps {
  url: string;
  nickname: string;
  label?: string;
}

export default function SpotifyButton({ url, nickname, label = 'Listen to this one' }: SpotifyButtonProps) {
  return (
    <a
      className="spotify-btn"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — a song dedicated to ${nickname} (opens Spotify in a new tab)`}
    >
      <Music size={17} aria-hidden="true" />
      <span className="spotify-btn-label">{label}</span>
      <span className="eq-bars" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </a>
  );
}
