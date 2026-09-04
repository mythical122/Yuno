import { useEffect, useState } from 'react';
import { loveSlides, memories } from '../data/loveSlides';
import { useCarousel } from '../hooks/useCarousel';
import FinalSurprise from '../components/FinalSurprise';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import IfYouWereHere from '../components/IfYouWereHere';
import Lightbox from '../components/Lightbox';
import LoveCarousel from '../components/LoveCarousel';
import LoveCounter from '../components/LoveCounter';
import LoveLetter from '../components/LoveLetter';
import LoveReasons from '../components/LoveReasons';
import MemorySection from '../components/MemorySection';
import Navbar from '../components/Navbar';
import Soundtrack from '../components/Soundtrack';
import TapMyHeart from '../components/TapMyHeart';
import Timeline from '../components/Timeline';

export default function Home() {
  const carousel = useCarousel({ length: loveSlides.length });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Never let the carousel autoplay run behind an open lightbox.
  const { pause, resume } = carousel;
  useEffect(() => {
    if (lightboxIndex !== null) pause();
    else resume();
  }, [lightboxIndex, pause, resume]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LoveCarousel carousel={carousel} suspended={lightboxIndex !== null} />
        <Timeline />
        <LoveCounter />
        <MemorySection onOpen={setLightboxIndex} />
        <LoveReasons />
        <TapMyHeart />
        <IfYouWereHere />
        <LoveLetter />
        <Soundtrack />
        <FinalSurprise />
      </main>
      <Footer />
      <Lightbox
        memories={memories}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
