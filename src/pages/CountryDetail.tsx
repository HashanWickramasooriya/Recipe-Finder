import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getCountryByName } from "../data/countries";
import { allRecipes } from "../data/recipes";
import { RecipeCard } from "../components/RecipeCard";
import { EmptyState } from "../components/EmptyState";
import { FlagIcon } from "../components/FlagIcon";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import NotFound from "./NotFound";

export default function CountryDetail() {
  const { name } = useParams<{ name: string }>();
  const { t } = useTranslation();
  const country = useMemo(() => getCountryByName(decodeURIComponent(name ?? "")), [name]);
  const recipes = useMemo(
    () => (country ? allRecipes.filter((r) => r.country === country.name) : []),
    [country],
  );
  useDocumentTitle(country ? `${country.name} recipes` : undefined, country?.blurb);

  if (!country) return <NotFound />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/countries" className="text-sm font-medium text-clay-600 hover:text-clay-700 dark:text-clay-300">
        &larr; {t("countries.title")}
      </Link>
      <div className="mt-4 flex items-center gap-4">
        <FlagIcon code={country.code} className="h-12 w-16 rounded-md shadow-md ring-1 ring-black/10" />
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-cream-100">
            {country.name}
          </h1>
          <p className="mt-1 text-sm text-ink-700/70 dark:text-cream-200/60">{country.blurb}</p>
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-clay-600 dark:text-clay-300">
        {t(recipes.length === 1 ? "countries.recipesCount_one" : "countries.recipesCount_other", {
          count: recipes.length,
        })}
      </p>

      <div className="mt-8">
        {recipes.length === 0 ? (
          <EmptyState title={t("search.noResults")} />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
