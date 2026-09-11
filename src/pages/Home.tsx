import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { allRecipes } from "../data/recipes";
import { countries } from "../data/countries";
import { RecipeCard } from "../components/RecipeCard";
import { CountryCard } from "../components/CountryCard";
import { SearchBar } from "../components/SearchBar";

const cuisineCount = new Set(allRecipes.map((r) => r.cuisine)).size;

export default function Home() {
  const { t } = useTranslation();
  const featured = allRecipes.filter((r) => r.featured).slice(0, 8);
  const popular = allRecipes.filter((r) => r.popular).slice(0, 8);
  const sampleCountries = countries.slice(0, 8);

  return (
    <div>
      <section className="border-b border-cream-200 bg-gradient-to-b from-cream-100 to-cream-50 dark:border-ink-700 dark:from-ink-800 dark:to-[#17130f]">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <h1 className="font-display text-3xl font-semibold leading-tight text-ink-900 dark:text-cream-100 sm:text-5xl">
            {t("home.heroTitle")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-ink-700/80 dark:text-cream-200/70 sm:text-lg">
            {t("home.heroSubtitle")}
          </p>
          <div className="mx-auto mt-8 max-w-xl">
            <SearchBar />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/countries"
              className="rounded-full border border-cream-300 bg-white px-5 py-2.5 text-sm font-medium text-ink-800 transition-colors hover:border-clay-300 dark:border-ink-600 dark:bg-ink-800 dark:text-cream-100"
            >
              {t("home.heroSecondaryCta")}
            </Link>
          </div>
          <div className="mx-auto mt-10 flex max-w-lg items-center justify-center gap-8 text-sm text-ink-700/70 dark:text-cream-200/60">
            <div>
              <div className="font-display text-xl font-semibold text-ink-900 dark:text-cream-100">
                {allRecipes.length}
              </div>
              {t("home.statsRecipes")}
            </div>
            <div>
              <div className="font-display text-xl font-semibold text-ink-900 dark:text-cream-100">
                {countries.length}
              </div>
              {t("home.statsCountries")}
            </div>
            <div>
              <div className="font-display text-xl font-semibold text-ink-900 dark:text-cream-100">
                {cuisineCount}
              </div>
              {t("home.statsCuisines")}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-cream-100">
            {t("home.featured")}
          </h2>
          <Link to="/search" className="text-sm font-medium text-clay-600 hover:text-clay-700 dark:text-clay-300">
            {t("home.seeAllRecipes")}
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      <section className="border-y border-cream-200 bg-cream-100/60 dark:border-ink-700 dark:bg-ink-800/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-2 text-center">
            <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-cream-100">
              {t("home.browseByCountry")}
            </h2>
            <p className="mt-1 text-sm text-ink-700/70 dark:text-cream-200/60">
              {t("home.browseByCountrySubtitle")}
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {sampleCountries.map((country) => {
              const sample = allRecipes.find((r) => r.country === country.name);
              const count = allRecipes.filter((r) => r.country === country.name).length;
              return (
                <CountryCard key={country.code} country={country} recipeCount={count} sampleRecipe={sample} />
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/countries"
              className="rounded-full bg-clay-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-clay-600"
            >
              {t("home.seeAllCountries")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-cream-100">
            {t("home.popular")}
          </h2>
          <Link to="/search" className="text-sm font-medium text-clay-600 hover:text-clay-700 dark:text-clay-300">
            {t("home.seeAllRecipes")}
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
}
