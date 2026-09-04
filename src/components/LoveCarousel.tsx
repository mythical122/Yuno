import { useEffect } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { loveSlides } from '../data/loveSlides';
import { AUTOPLAY_MS, type UseCarouselReturn } from '../hooks/useCarousel';
import LoveSlide from './LoveSlide';
import NavigationButtons from './NavigationButtons';
import ProgressBar from './ProgressBar';
import ThumbnailStrip from './ThumbnailStrip';

interface LoveCarouselProps {
  carousel: UseCarouselReturn;
  /** When true (e.g. lightbox open) keyboard control is handed over elsewhere. */
  suspended: boolean;
}

const SWIPE_OFFSET = 70;
const SWIPE_VELOCITY = 500;

export default function LoveCarousel({ carousel, suspended }: LoveCarouselProps) {
  const { currentIndex, isPlaying, cycle, next, previous, goTo, togglePlay, notifyInteraction } = carousel;

  const handleNext = () => {
    next();
    notifyInteraction();
  };

  const handlePrevious = () => {
    previous();
    notifyInteraction();
  };

  const handleSelect = (index: number) => {
    if (index !== currentIndex) {
      goTo(index);
      notifyInteraction();
    }
  };

  // Keyboard: ← previous, → next, Space pause/resume.
  useEffect(() => {
    if (suspended) return;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, [contenteditable="true"]')) return;

      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrevious();
      } else if (event.key === ' ') {
        if (target?.closest('button, a')) return; // let buttons use Space natively
        event.preventDefault();
        togglePlay();
        notifyInteraction();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suspended, togglePlay, notifyInteraction, next, previous]);

  // Swipe: left → next, right → previous (vertical scroll stays untouched).
  const handlePanEnd = (_event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    if (suspended) return;
    if (info.offset.x <= -SWIPE_OFFSET || info.velocity.x <= -SWIPE_VELOCITY) {
      handleNext();
    } else if (info.offset.x >= SWIPE_OFFSET || info.velocity.x >= SWIPE_VELOCITY) {
      handlePrevious();
    }
  };

  const slide = loveSlides[currentIndex];

  return (
    <section id="story" className="carousel-section" aria-roledescription="carousel" aria-label="Our love story">
      <ProgressBar durationMs={AUTOPLAY_MS} isPlaying={isPlaying && !suspended} resetKey={`${currentIndex}-${cycle}`} />

      <motion.div className="carousel-viewport" onPanEnd={handlePanEnd}>
        <AnimatePresence initial={false}>
          <LoveSlide key={slide.id} slide={slide} total={loveSlides.length} autoPlayMs={AUTOPLAY_MS} />
        </AnimatePresence>
      </motion.div>

      <div className="carousel-hud">
        <span className="slide-counter" aria-live="polite">
          {String(currentIndex + 1).padStart(2, '0')} <span className="slide-counter-sep">/</span>{' '}
          {String(loveSlides.length).padStart(2, '0')}
        </span>
        <button
          type="button"
          className="hud-btn"
          onClick={() => {
            togglePlay();
            notifyInteraction();
          }}
          aria-label={isPlaying ? 'Pause autoplay' : 'Resume autoplay'}
        >
          {isPlaying ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
        </button>
      </div>

      <NavigationButtons onPrevious={handlePrevious} onNext={handleNext} />

      {/* Compact mobile controls — [←]  01 / 09  ⏸  [→] */}
      <div className="carousel-controls">
        <button type="button" className="carousel-controls-btn" onClick={handlePrevious} aria-label="Previous memory">
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <div className="carousel-status">
          <span className="slide-counter" aria-live="polite">
            {String(currentIndex + 1).padStart(2, '0')} <span className="slide-counter-sep">/</span>{' '}
            {String(loveSlides.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            className="hud-btn"
            onClick={() => {
              togglePlay();
              notifyInteraction();
            }}
            aria-label={isPlaying ? 'Pause autoplay' : 'Resume autoplay'}
          >
            {isPlaying ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
          </button>
        </div>
        <button type="button" className="carousel-controls-btn" onClick={handleNext} aria-label="Next memory">
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      <ThumbnailStrip slides={loveSlides} activeIndex={currentIndex} onSelect={handleSelect} />
    </section>
  );
}
