import { useState, type CSSProperties } from 'react';
import { Heart } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  style?: CSSProperties;
}

/** Image with a graceful romantic fallback if the file ever fails to load. */
export default function SafeImage({ src, alt, className = '', loading = 'lazy', style }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`img-fallback ${className}`} role="img" aria-label={alt} style={style}>
        <Heart size={28} fill="currentColor" aria-hidden="true" />
        <span>{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      draggable={false}
      style={style}
      onError={() => setFailed(true)}
    />
  );
}
