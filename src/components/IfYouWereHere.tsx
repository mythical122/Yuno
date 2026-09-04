import { motion } from 'framer-motion';
import { romanticNotes } from '../data/romanticNotes';

export default function IfYouWereHere() {
  return (
    <section className="section notes-section" aria-label="If you were here">
      <motion.p
        className="section-eyebrow"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
      >
        A thought I keep having
      </motion.p>
      <motion.h2
        className="section-title notes-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        If You Were Here…
      </motion.h2>

      <div className="notes-list">
        {romanticNotes.map((note, index) => (
          <motion.p
            key={index}
            className="note-line"
            initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {note}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
