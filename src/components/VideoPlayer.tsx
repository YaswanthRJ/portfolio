import { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
  src: string;
  /** Human-readable name used in aria-labels and alt text. */
  label: string;
}

export default function VideoPlayer({ src, label }: VideoPlayerProps) {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (started && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay can still be blocked in some browsers even after a
        // click; the visible controls let the person start it manually.
      });
    }
  }, [started]);

  if (started) {
    return (
      <video
        ref={videoRef}
        src={src}
        controls
        className="aspect-video w-full rounded-lg border border-hairline bg-black"
      >
        Your browser doesn't support embedded video. You can{' '}
        <a href={src} className="text-accent underline underline-offset-2">
          download the file
        </a>{' '}
        instead.
      </video>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setStarted(true)}
      aria-label={`Play demo video: ${label}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-lg border border-hairline bg-black"
    >
      <video
        src={src}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="h-full w-full object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors duration-150 group-hover:bg-black/10">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f2f1ed] text-base shadow-none transition-transform duration-150 group-hover:scale-105 motion-reduce:group-hover:scale-100">
          <svg
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            aria-hidden="true"
          >
            <path d="M17 9.13a1 1 0 0 1 0 1.74L1.5 19.4A1 1 0 0 1 0 18.53V1.47A1 1 0 0 1 1.5.6L17 9.13Z" fill="#0a0a0b" />
          </svg>
        </span>
      </span>
    </button>
  );
}
