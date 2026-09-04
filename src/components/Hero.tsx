import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Heart } from 'lucide-react';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

interface BurstHeart {
  id: number;
  x: number;
  y: number;
  rotate: number;
  scale: number;
}

export default function Hero() {
  const [burst, setBurst] = useState<BurstHeart[]>([]);
  const burstId = useRef(0);

  const openHeart = () => {
    // Gentle heart burst, then glide into our story.
    const hearts: BurstHeart[] = Array.from({ length: 7 }, (_, i) => {
      const angle = (i / 7) * Math.PI * 2 + Math.random() * 0.6;
      const radius = 70 + Math.random() * 60;
      return {
        id: burstId.current++,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius - 20,
        rotate: (Math.random() - 0.5) * 40,
        scale: 0.5 + Math.random() * 0.7,
      };
    });
    setBurst(hearts);
    window.setTimeout(() => setBurst([]), 1000);
    window.setTimeout(() => {
      document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
    }, 380);
  };

  return (
    <section id="home" className="hero" aria-label="Welcome">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />

      <motion.div className="hero-content" variants={container} initial="hidden" animate="show">
        <motion.span className="hero-envelope" variants={item} aria-hidden="true">
          💌
        </motion.span>
        <motion.p className="hero-eyebrow" variants={item}>
          For My Love
        </motion.p>
        <motion.h1 className="hero-name" variants={item}>
          Shreemati <span className="hero-name-heart">❤️</span>
        </motion.h1>
        <motion.p className="hero-line" variants={item}>
          I made you
          <br />
          a little corner
          <br />
          <em>of the internet.</em>
        </motion.p>
        <motion.div variants={item} className="hero-cta">
          <button type="button" id="hero-heart" className="btn-romantic hero-heart-btn" onClick={openHeart}>
            <Heart size={16} fill="currentColor" aria-hidden="true" />
            Open My Heart ❤️
          </button>
          {/* tiny burst of hearts on click */}
          {burst.map((heart) => (
            <motion.span
              key={heart.id}
              className="hero-burst-heart"
              aria-hidden="true"
              initial={{ opacity: 0.95, x: 0, y: 0, scale: 0.3, rotate: 0 }}
              animate={{ opacity: 0, x: heart.x, y: heart.y, scale: heart.scale, rotate: heart.rotate }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              <Heart size={16} fill="currentColor" />
            </motion.span>
          ))}
          <p className="hero-tagline">I made this little corner of the internet just for you.</p>
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        className="hero-scroll-hint"
        onClick={openHeart}
        aria-label="Scroll to our story"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <ChevronDown size={22} aria-hidden="true" />
      </motion.button>
    </section>
  );
}
