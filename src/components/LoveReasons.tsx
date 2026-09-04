import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { loveReasons } from '../data/loveReasons';

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function LoveReasons() {
  return (
    <section id="reasons" className="section reasons-section" aria-label="Reasons why I love you">
      <motion.p
        className="section-eyebrow"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        Only a few of them
      </motion.p>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.08 }}
      >
        A Few Reasons Why I Love You
      </motion.h2>

      <motion.div
        className="reasons-grid"
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        {loveReasons.map((reason, index) => (
          <motion.article key={index} className="reason-card" variants={cardVariants}>
            <span className="reason-number" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="reason-title">{reason.title}</h3>
            <p className="reason-detail">{reason.detail}</p>
          </motion.article>
        ))}
      </motion.div>

      <motion.p
        className="reasons-forever"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.4 }}
      >
        <Heart size={14} fill="currentColor" aria-hidden="true" />
        And honestly… I could keep going forever. ❤️
      </motion.p>
    </section>
  );
}
