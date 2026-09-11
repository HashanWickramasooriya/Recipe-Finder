import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Recipe } from "../types/recipe";
import { RecipeImage } from "./RecipeImage";
import { FavoriteButton } from "./FavoriteButton";
import { formatMinutes } from "../lib/format";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const { t } = useTranslation();
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-cream-200 bg-white shadow-card transition-shadow hover:shadow-card-hover dark:border-ink-700 dark:bg-ink-800">
      <Link to={`/recipes/${recipe.id}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-100 dark:bg-ink-700">
          <RecipeImage
            src={recipe.image}
            alt={recipe.imageAlt}
            className="h-full w-full transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-ink-800 backdrop-blur-sm dark:bg-ink-900/80 dark:text-cream-100">
            {recipe.country}
          </span>
        </div>
      </Link>
      <FavoriteButton
        recipeId={recipe.id}
        className="absolute right-3 top-3 z-10"
      />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link to={`/recipes/${recipe.id}`} className="block">
          <h3 className="font-display text-lg font-medium leading-snug text-ink-900 group-hover:text-clay-600 dark:text-cream-100 dark:group-hover:text-clay-300">
            {recipe.name}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm text-ink-700/80 dark:text-cream-200/70">
          {recipe.description}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-ink-700/70 dark:text-cream-200/60">
          <span className="inline-flex items-center gap-1">
            <ClockIcon />
            {formatMinutes(totalTime)}
          </span>
          <span className="inline-flex items-center gap-1 capitalize">
            <DifficultyIcon />
            {t(`filters.difficulty.${recipe.difficulty}`)}
          </span>
        </div>
      </div>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 7v5l3 3" />
    </svg>
  );
}

function DifficultyIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 20V10m8 10V4m8 16v-7" />
    </svg>
  );
}
