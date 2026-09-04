import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Loader from './components/Loader';
import CursorGlow from './components/CursorGlow';
import FloatingHearts from './components/FloatingHearts';
import Home from './pages/Home';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show the loader just long enough to feel intentional — never annoying.
    const heroImage = new Image();
    heroImage.src = '/image/yuno1.jpg';
    const imageReady = new Promise<void>((resolve) => {
      heroImage.onload = () => resolve();
      heroImage.onerror = () => resolve();
    });
    const minDelay = new Promise<void>((resolve) => window.setTimeout(resolve, 1400));

    Promise.all([imageReady, minDelay]).then(() => setLoading(false));
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
      <CursorGlow />
      <FloatingHearts />
      <Home />
    </MotionConfig>
  );
}
