import { useEffect, useRef, useState } from 'react';

/**
 * Very subtle rose glow that follows the pointer.
 * Desktop only — disabled on touch devices and for reduced motion.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    setEnabled(true);
    // Park it offscreen until the first mousemove so it can never
    // create layout overflow on narrow screens.
    if (glowRef.current) {
      glowRef.current.style.transform = 'translate3d(-9999px, -9999px, 0)';
    }
    const onMove = (event: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  if (!enabled) return null;
  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}
