import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Country, Recipe } from "../types/recipe";
import { RecipeImage } from "./RecipeImage";
import { FlagIcon } from "./FlagIcon";

interface CountryCardProps {
  country: Country;
  recipeCount: number;
  sampleRecipe?: Recipe;
}

export function CountryCard({ country, recipeCount, sampleRecipe }: CountryCardProps) {
  const { t } = useTranslation();

  return (
    <Link
      to={`/countries/${encodeURIComponent(country.name)}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-cream-200 bg-white shadow-card transition-shadow hover:shadow-card-hover dark:border-ink-700 dark:bg-ink-800"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-100 dark:bg-ink-700">
        {sampleRecipe ? (
          <RecipeImage
            src={sampleRecipe.image}
            alt={sampleRecipe.imageAlt}
            className="h-full w-full transition-transform duration-300 group-hover:scale-105"
          />
        ) : null}
        <FlagIcon
          code={country.code}
          className="absolute left-3 top-3 h-6 w-9 rounded-sm shadow-md ring-1 ring-black/10"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="font-display text-lg font-medium text-ink-900 group-hover:text-clay-600 dark:text-cream-100 dark:group-hover:text-clay-300">
          {country.name}
        </h3>
        <p className="line-clamp-2 text-sm text-ink-700/80 dark:text-cream-200/70">{country.blurb}</p>
        <p className="mt-auto pt-2 text-xs font-medium text-clay-600 dark:text-clay-300">
          {t(recipeCount === 1 ? "countries.recipesCount_one" : "countries.recipesCount_other", {
            count: recipeCount,
          })}
        </p>
      </div>
    </Link>
  );
}
