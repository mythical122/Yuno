import { useEffect, useRef } from 'react';
import type { LoveSlide } from '../types/love';
import SafeImage from './SafeImage';

interface ThumbnailStripProps {
  slides: LoveSlide[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function ThumbnailStrip({ slides, activeIndex, onSelect }: ThumbnailStripProps) {
  const activeRef = useRef<HTMLButtonElement | null>(null);

  // Keep the active thumbnail visible inside the horizontal scroll area.
  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [activeIndex]);

  return (
    <div className="thumbnail-strip" role="tablist" aria-label="Choose a memory">
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={slide.id}
            ref={isActive ? activeRef : undefined}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Memory ${index + 1}: ${slide.nickname}`}
            className={`thumbnail${isActive ? ' active' : ''}`}
            onClick={() => onSelect(index)}
          >
            <SafeImage src={slide.image} alt="" className="thumbnail-img" loading="lazy" />
            <span className="thumbnail-label">{slide.nickname}</span>
          </button>
        );
      })}
    </div>
  );
}
