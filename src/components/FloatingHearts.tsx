import { Heart } from 'lucide-react';

interface FloatingHeartSpec {
  left: string;
  size: number;
  duration: string;
  delay: string;
}

/** Just four hearts — a whisper, not confetti. */
const HEARTS: FloatingHeartSpec[] = [
  { left: '10%', size: 12, duration: '18s', delay: '0s' },
  { left: '36%', size: 10, duration: '22s', delay: '9s' },
  { left: '66%', size: 13, duration: '20s', delay: '4s' },
  { left: '90%', size: 9, duration: '24s', delay: '13s' },
];

export default function FloatingHearts() {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {HEARTS.map((heart, index) => (
        <Heart
          key={index}
          className="floating-heart"
          size={heart.size}
          fill="currentColor"
          style={{
            left: heart.left,
            animationDuration: heart.duration,
            animationDelay: heart.delay,
          }}
        />
      ))}
    </div>
  );
}
