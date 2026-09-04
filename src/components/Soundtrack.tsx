import { useState } from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';
import { loveSlides } from '../data/loveSlides';

/** Friendly names for the dedicated songs (✏️ rename to the actual tracks if you like). */
const SONG_NAMES: Record<number, string> = {
  1: 'For This Day',
  2: 'Through Ups & Downs',
  3: 'When You Smile',
  4: 'Mummy Jitna Pyaar',
  5: 'The Exam Song',
  6: 'Thank You, Jaan',
  7: 'Yuno 3000',
  8: 'Words Will Fall Short',
  9: 'Our Whole Playlist',
};

export default function Soundtrack() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const songs = loveSlides.filter((slide) => slide.spotifyUrl);

  return (
    <section id="soundtrack" className="section soundtrack-section" aria-label="Our soundtrack">
      <motion.p
        className="section-eyebrow"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
      >
        Press play, think of me
      </motion.p>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.08 }}
      >
        If My Feelings Had a Soundtrack…
      </motion.h2>

      <div className="soundtrack-grid">
        {songs.map((slide, index) => {
          const isActive = activeId === slide.id;
          return (
            <motion.a
              key={slide.id}
              href={slide.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`song-card${isActive ? ' active' : ''}`}
              aria-label={`Play "${SONG_NAMES[slide.id]}" on Spotify — for ${slide.nickname} (opens in a new tab)`}
              onMouseEnter={() => setActiveId(slide.id)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(slide.id)}
              onBlur={() => setActiveId(null)}
              onClick={() => setActiveId(slide.id)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
            >
              <span className="song-icon" aria-hidden="true">
                <Music size={18} />
              </span>
              <span className="song-info">
                <span className="song-name">{SONG_NAMES[slide.id]}</span>
                <span className="song-for">for {slide.nickname}</span>
              </span>
              <span className="song-eq" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
