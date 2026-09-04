import { useEffect } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { MemoryItem } from '../types/love';
import SafeImage from './SafeImage';

interface LightboxProps {
  memories: MemoryItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const SWIPE_OFFSET = 60;
const SWIPE_VELOCITY = 450;

export default function Lightbox({ memories, index, onClose, onNavigate }: LightboxProps) {
  const isOpen = index !== null;
  const total = memories.length;

  // Keyboard support + body scroll lock while open.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      else if (event.key === 'ArrowRight') onNavigate((index + 1) % total);
      else if (event.key === 'ArrowLeft') onNavigate((index - 1 + total) % total);
    };

    window.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, index, total, onClose, onNavigate]);

  const handlePanEnd = (_event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    if (index === null) return;
    if (info.offset.x <= -SWIPE_OFFSET || info.velocity.x <= -SWIPE_VELOCITY) {
      onNavigate((index + 1) % total);
    } else if (info.offset.x >= SWIPE_OFFSET || info.velocity.x >= SWIPE_VELOCITY) {
      onNavigate((index - 1 + total) % total);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${index + 1} of ${total}: ${memories[index].caption}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <div className="lightbox-top">
            <span className="lightbox-counter" aria-hidden="true">
              {index + 1} / {total}
            </span>
            <button type="button" className="lightbox-btn" onClick={onClose} aria-label="Close photo viewer (Esc)">
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            className="lightbox-btn lightbox-prev"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate((index - 1 + total) % total);
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>

          <motion.div
            className="lightbox-stage"
            onClick={(event) => event.stopPropagation()}
            onPanEnd={handlePanEnd}
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={index}
                className="lightbox-frame"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <SafeImage
                  src={memories[index].image}
                  alt={memories[index].alt}
                  className="lightbox-img"
                  loading="eager"
                />
              </motion.div>
            </AnimatePresence>
            <p className="lightbox-caption">{memories[index].caption}</p>
          </motion.div>

          <button
            type="button"
            className="lightbox-btn lightbox-next"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate((index + 1) % total);
            }}
            aria-label="Next photo"
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
