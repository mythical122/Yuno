import { motion } from 'framer-motion';
import type { LoveSlide as LoveSlideData } from '../types/love';
import SafeImage from './SafeImage';
import SpotifyButton from './SpotifyButton';

const contentVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.35 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

interface LoveSlideProps {
  slide: LoveSlideData;
  total: number;
  autoPlayMs: number;
}

export default function LoveSlide({ slide, total, autoPlayMs }: LoveSlideProps) {
  return (
    <motion.article
      className="love-slide"
      aria-label={`${slide.nickname} — memory ${slide.id} of ${total}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.55 } }}
      transition={{ duration: 0.9 }}
    >
      {/* Slow Ken Burns zoom on the photograph */}
      <motion.div
        className="love-slide-media"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: autoPlayMs / 1000 + 1.5, ease: 'linear' }}
      >
        <SafeImage
          src={slide.image}
          alt={slide.alt}
          className="love-slide-img"
          loading={slide.id === 1 ? 'eager' : 'lazy'}
          style={{ objectPosition: slide.objectPosition ?? 'center center' }}
        />
      </motion.div>
      <div className="love-slide-overlay" aria-hidden="true" />

      <motion.div className="love-slide-content" variants={contentVariants} initial="hidden" animate="show">
        <motion.p className="slide-author" variants={itemVariants}>
          {slide.author}
        </motion.p>
        <motion.h2 className="slide-title" variants={itemVariants}>
          {slide.title}
        </motion.h2>
        <motion.p className="slide-nickname" variants={itemVariants}>
          {slide.nickname}
        </motion.p>
        <motion.div className="slide-message" variants={itemVariants}>
          <p>{slide.message}</p>
        </motion.div>
        {slide.spotifyUrl && (
          <motion.div variants={itemVariants} className="slide-cta">
            <SpotifyButton url={slide.spotifyUrl} label={slide.spotifyLabel} nickname={slide.nickname} />
          </motion.div>
        )}
      </motion.div>
    </motion.article>
  );
}
