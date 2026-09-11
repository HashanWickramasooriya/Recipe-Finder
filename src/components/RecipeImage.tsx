import { useState } from "react";

interface RecipeImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function RecipeImage({ src, alt, className = "", priority = false }: RecipeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-cream-200 text-clay-600 dark:bg-ink-700 dark:text-clay-300 ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          className="h-10 w-10 opacity-60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5V6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v9.75m-18 0A2.25 2.25 0 0 0 5.25 18.75h13.5A2.25 2.25 0 0 0 21 16.5m-18 0 5.03-5.03a2.25 2.25 0 0 1 3.182 0l1.788 1.787m6-6-2.755-2.756a2.25 2.25 0 0 0-3.182 0l-5.03 5.03"
          />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
