import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, RotateCcw } from 'lucide-react';

const LINES = ["I'd choose you.", 'Again.', 'And again.', 'And again.'];

/**
 * The emotional ending — a gentle reveal instead of the plain final message.
 * Nothing is permanently hidden: reduced-motion users get it instantly.
 */
export default function FinalSurprise() {
  const [revealed, setRevealed] = useState(false);

  const replay = () => {
    setRevealed(false);
    window.setTimeout(() => setRevealed(true), 350);
  };

  return (
    <section id="surprise" className="section final-section" aria-label="One last thing">
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="closed"
            className="final-teaser"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.35 } }}
            transition={{ duration: 0.7 }}
          >
            <p className="final-lead">Wait…</p>
            <h2 className="final-line final-teaser-line">I have one more thing to tell you.</h2>
            <button type="button" className="btn-romantic" onClick={() => setRevealed(true)}>
              <Heart size={16} fill="currentColor" aria-hidden="true" />
              Open It ❤️
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="open"
            className="final-revealed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="final-heart"
              aria-hidden="true"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Heart size={54} fill="currentColor" />
            </motion.span>

            <div className="final-lines">
              {LINES.map((line, index) => (
                <motion.p
                  key={`${index}-${line}`}
                  className="final-line-item"
                  initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, delay: 0.5 + index * 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <motion.p
              className="final-forever"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 2.6 }}
            >
              Forever sounds pretty good if it's with you. ❤️
            </motion.p>

            <motion.div
              className="final-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 3.1 }}
            >
              <button type="button" className="btn-romantic" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Replay Our Story ❤️
              </button>
              <button type="button" className="btn-ghost" onClick={replay}>
                <RotateCcw size={15} aria-hidden="true" />
                Replay this moment
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
