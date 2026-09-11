import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { countries } from "../data/countries";
import { allRecipes } from "../data/recipes";
import { CountryCard } from "../components/CountryCard";
import { EmptyState } from "../components/EmptyState";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import type { Recipe } from "../types/recipe";

const REGIONS: Recipe["region"][] = ["Asia", "Middle East", "Africa", "Europe", "Americas", "Oceania"];

export default function Countries() {
  const { t } = useTranslation();
  useDocumentTitle("Countries", "Browse authentic recipes from countries all around the world.");
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Recipe["region"] | "">("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return countries.filter((c) => {
      if (region && c.region !== region) return false;
      if (q && !c.name.toLowerCase().includes(q) && !c.cuisine.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, region]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-cream-100">
          {t("countries.title")}
        </h1>
        <p className="mt-2 text-sm text-ink-700/70 dark:text-cream-200/60">{t("countries.subtitle")}</p>
      </div>

      <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-cream-200 bg-white px-4 py-2.5 shadow-sm dark:border-ink-700 dark:bg-ink-800">
          <svg className="h-4 w-4 shrink-0 text-ink-700/50 dark:text-cream-200/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("countries.searchPlaceholder") ?? ""}
            className="w-full bg-transparent text-sm text-ink-900 outline-none placeholder:text-ink-700/50 dark:text-cream-100"
          />
        </div>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value as Recipe["region"] | "")}
          className="rounded-full border border-cream-200 bg-white px-4 py-2.5 text-sm text-ink-900 dark:border-ink-700 dark:bg-ink-800 dark:text-cream-100"
        >
          <option value="">{t("countries.allRegions")}</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {t(`countries.region.${r}`)}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-10">
        {filtered.length === 0 ? (
          <EmptyState title={t("countries.noCountriesFound")} />
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((country) => {
              const sample = allRecipes.find((r) => r.country === country.name);
              const count = allRecipes.filter((r) => r.country === country.name).length;
              return (
                <CountryCard key={country.code} country={country} recipeCount={count} sampleRecipe={sample} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
