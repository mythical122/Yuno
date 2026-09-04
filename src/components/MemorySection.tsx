import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { memories } from '../data/loveSlides';
import SafeImage from './SafeImage';
import AlbumViewer from './AlbumViewer';

interface MemorySectionProps {
  onOpen: (index: number) => void;
}

export default function MemorySection({ onOpen }: MemorySectionProps) {
  return (
    <motion.section
      id="memories"
      className="section memories-section"
      aria-label="Our little universe — photo memories"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <p className="section-eyebrow">Every picture, a heartbeat</p>
      <h2 className="section-title">Our Little Universe ❤️</h2>

      <div className="memories-grid">
        {memories.map((memory, index) => (
          <motion.button
            key={memory.id}
            type="button"
            className="memory-card"
            onClick={() => onOpen(index)}
            aria-label={`Open photo ${index + 1} of ${memories.length}: ${memory.caption}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
          >
            <SafeImage
              src={memory.image}
              alt={memory.alt}
              className="memory-img"
              loading="lazy"
              style={{ objectPosition: memory.objectPosition ?? 'center center' }}
            />
            <span className="memory-overlay" aria-hidden="true">
              <Heart size={26} fill="currentColor" />
            </span>
            <span className="memory-caption">{memory.caption}</span>
          </motion.button>
        ))}
      </div>

      <AlbumViewer />
    </motion.section>
  );
}
