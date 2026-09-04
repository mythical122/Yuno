import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
}

export default function NavigationButtons({ onPrevious, onNext }: NavigationButtonsProps) {
  return (
    <div className="carousel-nav">
      <button type="button" className="carousel-nav-btn" onClick={onPrevious} aria-label="Previous memory">
        <ChevronLeft size={22} aria-hidden="true" />
      </button>
      <button type="button" className="carousel-nav-btn" onClick={onNext} aria-label="Next memory">
        <ChevronRight size={22} aria-hidden="true" />
      </button>
    </div>
  );
}
