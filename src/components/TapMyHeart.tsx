import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { heartMessages } from '../data/heartMessages';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  rotate: number;
  scale: number;
}

export default function TapMyHeart() {
  const [taps, setTaps] = useState(0);
  const [messageIndex, setMessageIndex] = useState(-1);
  const [particles, setParticles] = useState<HeartParticle[]>([]);
  const particleId = useRef(0);
  const lastTapAt = useRef(0);

  const handleTap = () => {
    // Gentle debounce so the burst never becomes a spam fest.
    const now = Date.now();
    if (now - lastTapAt.current < 250) return;
    lastTapAt.current = now;

    setTaps((t) => t + 1);
    setMessageIndex((m) => (m + 1) % heartMessages.length);

    const burst: HeartParticle[] = Array.from({ length: 3 }, () => ({
      id: particleId.current++,
      x: (Math.random() - 0.5) * 110,
      y: -60 - Math.random() * 70,
      rotate: (Math.random() - 0.5) * 50,
      scale: 0.6 + Math.random() * 0.6,
    }));
    setParticles((current) => [...current.slice(-14), ...burst]);
    window.setTimeout(() => {
      setParticles((current) => current.filter((p) => !burst.some((b) => b.id === p.id)));
    }, 950);
  };

  return (
    <section className="section tapheart-section" aria-label="Tap my heart">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        Tap My Heart
      </motion.h2>
      <motion.p
        className="tapheart-hint"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        Tap it. I have something to tell you.
      </motion.p>

      <div className="tapheart-stage">
        <motion.button
          type="button"
          className="tapheart-btn"
          onClick={handleTap}
          whileTap={{ scale: 0.88 }}
          aria-label="Tap my heart — I have something to tell you"
        >
          <Heart className="tapheart-heart" size={88} fill="currentColor" aria-hidden="true" />
        </motion.button>

        {/* tiny burst particles */}
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.span
              key={particle.id}
              className="tapheart-particle"
              aria-hidden="true"
              initial={{ opacity: 0.9, x: 0, y: 0, scale: 0.4, rotate: 0 }}
              animate={{
                opacity: 0,
                x: particle.x,
                y: particle.y,
                scale: particle.scale,
                rotate: particle.rotate,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              <Heart size={18} fill="currentColor" />
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <div className="tapheart-message-slot" aria-live="polite">
        <AnimatePresence mode="wait">
          {messageIndex >= 0 && (
            <motion.p
              key={messageIndex}
              className="tapheart-message"
              initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
              transition={{ duration: 0.45 }}
            >
              {heartMessages[messageIndex]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <p className="tapheart-counter" aria-label={`Heartbeats: ${taps}`}>
        Heartbeats: {String(taps).padStart(2, '0')}
      </p>
    </section>
  );
}
