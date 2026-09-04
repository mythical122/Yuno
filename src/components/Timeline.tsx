import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { timeline } from '../data/timeline';
import SafeImage from './SafeImage';

export default function Timeline() {
  return (
    <section id="timeline" className="section timeline-section" aria-label="A little timeline of us">
      <motion.p
        className="section-eyebrow"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        Us, in moments
      </motion.p>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.08 }}
      >
        A Little Timeline of Us
      </motion.h2>

      <ol className="timeline">
        {timeline.map((entry, index) => (
          <motion.li
            key={`${entry.date}-${index}`}
            className="timeline-item"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="timeline-marker" aria-hidden="true">
              <Heart size={11} fill="currentColor" />
            </span>
            <div className="timeline-card">
              <p className="timeline-date">{entry.date}</p>
              <h3 className="timeline-title">{entry.title}</h3>
              <p className="timeline-desc">{entry.description}</p>
              {entry.image && (
                <div className="timeline-photo">
                  <SafeImage src={entry.image} alt={entry.title} loading="lazy" />
                </div>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
