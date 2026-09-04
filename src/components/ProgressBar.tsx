interface ProgressBarProps {
  durationMs: number;
  isPlaying: boolean;
  resetKey: string;
}

/** Thin rose → gold progress line showing the current slide's autoplay duration. */
export default function ProgressBar({ durationMs, isPlaying, resetKey }: ProgressBarProps) {
  return (
    <div className="progress-track" aria-hidden="true">
      <div
        key={resetKey}
        className="progress-fill"
        style={{
          animationDuration: `${durationMs}ms`,
          animationPlayState: isPlaying ? 'running' : 'paused',
        }}
      />
    </div>
  );
}
