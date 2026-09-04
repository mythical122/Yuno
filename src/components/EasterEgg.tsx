import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const UNLOCK_AT = 7;

/**
 * 🥚 One tiny heart hiding in the footer.
 * Tap it 7 times and it whispers a secret.
 */
export default function EasterEgg() {
  const [taps, setTaps] = useState(0);
  const [unlocked, setUnlocked] = useState(false);

  const handleTap = () => {
    if (unlocked) return;
    const next = taps + 1;
    setTaps(next);
    if (next >= UNLOCK_AT) setUnlocked(true);
  };

  return (
    <span className="easter-egg">
      <motion.button
        type="button"
        className="easter-heart"
        onClick={handleTap}
        whileTap={{ scale: 0.8 }}
        aria-label="A tiny decorative heart — for you, if you ever find it"
      >
        <Heart size={12} fill="currentColor" aria-hidden="true" />
      </motion.button>

      <AnimatePresence>
        {unlocked && (
          <motion.span
            className="easter-secret"
            role="status"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            You found my little secret…
            <br />
            just like you found your way into my heart. ❤️
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
