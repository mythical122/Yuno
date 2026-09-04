import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { YOUR_NAME } from '../data/siteConfig';

export default function LoveLetter() {
  return (
    <motion.section
      id="for-you"
      className="section letter-section"
      aria-label="A letter for you"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      <div className="letter-card">
        <span className="letter-seal" aria-hidden="true">
          <Heart size={20} fill="currentColor" />
        </span>
        <p className="section-eyebrow">A letter, of sorts</p>
        <h2 className="section-title">A little something for you</h2>
        <div className="letter-body">
          <p>
            I could write a thousand words,
            <br />
            but somehow none of them would
            <br />
            ever be enough.
          </p>
          <p>
            So I made you this little corner
            <br />
            of the internet.
          </p>
          <p>Just for you. ❤️</p>
        </div>
        <p className="letter-sign">— written for you, by Your {YOUR_NAME}</p>
      </div>
    </motion.section>
  );
}
