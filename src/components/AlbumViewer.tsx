import { useEffect, useState } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { memories } from '../data/loveSlides';
import SafeImage from './SafeImage';

const SWIPE_OFFSET = 60;
const SWIPE_VELOCITY = 450;

/**
 * "Our Little Album" — an immersive full-page album.
 * Swipe / arrows / keyboard. Escape closes. Body scroll locked while open.
 */
export default function AlbumViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const total = memories.length;
  const current = memories[index];

  const goTo = (nextIndex: number) => setIndex(((nextIndex % total) + total) % total);

  // Keyboard + body scroll lock while open.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
      else if (event.key === 'ArrowRight') goTo(index + 1);
      else if (event.key === 'ArrowLeft') goTo(index - 1);
    };

    window.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, index]);

  const handlePanEnd = (_event: unknown, info: PanInfo) => {
    if (info.offset.x <= -SWIPE_OFFSET || info.velocity.x <= -SWIPE_VELOCITY) goTo(index + 1);
    else if (info.offset.x >= SWIPE_OFFSET || info.velocity.x >= SWIPE_VELOCITY) goTo(index - 1);
  };

  return (
    <>
      <div className="album-open-wrap">
        <button type="button" className="btn-romantic" onClick={() => setIsOpen(true)}>
          Open Our Little Album
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="album"
            role="dialog"
            aria-modal="true"
            aria-label={`Our little album — photo ${index + 1} of ${total}: ${current.caption}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* blurred ambient background from the current photo */}
            <div
              className="album-bg"
              aria-hidden="true"
              style={{ backgroundImage: `url(${current.image})` }}
            />
            <div className="album-dim" aria-hidden="true" />

            <div className="album-top">
              <span className="album-counter" aria-hidden="true">
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              <button
                type="button"
                className="lightbox-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close album (Esc)"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <motion.div className="album-stage" onPanEnd={handlePanEnd}>
              <AnimatePresence initial={false} mode="popLayout">
                <motion.figure
                  key={current.id}
                  className="album-frame"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <SafeImage src={current.image} alt={current.alt} className="album-img" loading="eager" />
                  <figcaption className="album-caption">{current.caption}</figcaption>
                </motion.figure>
              </AnimatePresence>
            </motion.div>

            <div className="album-controls">
              <button type="button" className="lightbox-btn" onClick={() => goTo(index - 1)} aria-label="Previous photo">
                <ChevronLeft size={22} aria-hidden="true" />
              </button>
              <button type="button" className="lightbox-btn" onClick={() => goTo(index + 1)} aria-label="Next photo">
                <ChevronRight size={22} aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
