import { useTranslation } from "react-i18next";
import { useFavoritesStore } from "../store/useFavoritesStore";

interface FavoriteButtonProps {
  recipeId: string;
  className?: string;
}

export function FavoriteButton({ recipeId, className = "" }: FavoriteButtonProps) {
  const { t } = useTranslation();
  const isFavorite = useFavoritesStore((s) => s.isFavorite(recipeId));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(recipeId);
      }}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? t("recipe.removeSaved") : t("recipe.save")}
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-clay-600 shadow-sm backdrop-blur-sm transition-colors hover:bg-white dark:bg-ink-900/80 dark:text-clay-300 dark:hover:bg-ink-900 ${className}`}
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 20.25c-.4 0-.79-.14-1.1-.4C7.14 16.6 3.75 13.28 3.75 9.6 3.75 6.99 5.8 5 8.35 5c1.44 0 2.82.68 3.65 1.77C12.83 5.68 14.21 5 15.65 5 18.2 5 20.25 6.99 20.25 9.6c0 3.68-3.39 7-7.15 10.25-.31.26-.7.4-1.1.4Z"
        />
      </svg>
    </button>
  );
}
