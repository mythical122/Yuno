import { useCallback, useEffect, useRef, useState } from 'react';

export const AUTOPLAY_MS = 7000;
export const RESUME_DELAY_MS = 12000;

export interface UseCarouselOptions {
  length: number;
  autoPlayMs?: number;
  resumeDelayMs?: number;
}

export interface UseCarouselReturn {
  currentIndex: number;
  isPlaying: boolean;
  /** Increments every time a new slide cycle starts — used to restart the progress bar. */
  cycle: number;
  next: () => void;
  previous: () => void;
  goTo: (index: number) => void;
  pause: () => void;
  resume: () => void;
  togglePlay: () => void;
  /** Pauses autoplay after user interaction and resumes it after a short delay. */
  notifyInteraction: () => void;
}

export function useCarousel({
  length,
  autoPlayMs = AUTOPLAY_MS,
  resumeDelayMs = RESUME_DELAY_MS,
}: UseCarouselOptions): UseCarouselReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [cycle, setCycle] = useState(0);
  const resumeTimeout = useRef<number | null>(null);

  const startCycle = useCallback((updater: (index: number) => number) => {
    setCurrentIndex(updater);
    setCycle((c) => c + 1);
  }, []);

  const next = useCallback(() => {
    startCycle((i) => (i + 1) % length);
  }, [length, startCycle]);

  const previous = useCallback(() => {
    startCycle((i) => (i - 1 + length) % length);
  }, [length, startCycle]);

  const goTo = useCallback(
    (index: number) => {
      startCycle(() => ((index % length) + length) % length);
    },
    [length, startCycle],
  );

  const pause = useCallback(() => setIsPlaying(false), []);

  const resume = useCallback(() => {
    setIsPlaying(true);
    setCycle((c) => c + 1);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((playing) => {
      if (!playing) setCycle((c) => c + 1);
      return !playing;
    });
  }, []);

  const notifyInteraction = useCallback(() => {
    setIsPlaying(false);
    if (resumeTimeout.current !== null) {
      window.clearTimeout(resumeTimeout.current);
    }
    resumeTimeout.current = window.setTimeout(() => {
      setIsPlaying(true);
      setCycle((c) => c + 1);
      resumeTimeout.current = null;
    }, resumeDelayMs);
  }, [resumeDelayMs]);

  // Autoplay — one clean timeout per slide, always cleaned up.
  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setTimeout(() => {
      startCycle((i) => (i + 1) % length);
    }, autoPlayMs);
    return () => window.clearTimeout(timer);
  }, [isPlaying, currentIndex, cycle, length, autoPlayMs, startCycle]);

  // Clear pending resume timer on unmount.
  useEffect(
    () => () => {
      if (resumeTimeout.current !== null) window.clearTimeout(resumeTimeout.current);
    },
    [],
  );

  return {
    currentIndex,
    isPlaying,
    cycle,
    next,
    previous,
    goTo,
    pause,
    resume,
    togglePlay,
    notifyInteraction,
  };
}
