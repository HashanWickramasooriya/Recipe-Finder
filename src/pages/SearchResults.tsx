import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { allRecipes } from "../data/recipes";
import { RecipeCard } from "../components/RecipeCard";
import { SearchBar } from "../components/SearchBar";
import { FilterPanel } from "../components/FilterPanel";
import { EmptyState } from "../components/EmptyState";
import { filterRecipes, sortRecipes, getSearchSuggestions, type RecipeFilters, type SortOption } from "../lib/search";
import { useSearchHistoryStore } from "../store/useSearchHistoryStore";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export default function SearchResults() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  useDocumentTitle(query ? `Search: ${query}` : "Search recipes", "Search recipes by name, ingredient, country, or cuisine.");
  const [filters, setFilters] = useState<RecipeFilters>({ query });
  const [sort, setSort] = useState<SortOption>("relevance");
  const history = useSearchHistoryStore((s) => s.history);
  const clearHistory = useSearchHistoryStore((s) => s.clearHistory);

  const countries = useMemo(
    () => Array.from(new Set(allRecipes.map((r) => r.country))).sort(),
    [],
  );
  const cuisines = useMemo(
    () => Array.from(new Set(allRecipes.map((r) => r.cuisine))).sort(),
    [],
  );

  const results = useMemo(
    () => sortRecipes(filterRecipes(allRecipes, { ...filters, query }), sort),
    [filters, query, sort],
  );

  const suggestions = useMemo(() => getSearchSuggestions(allRecipes), []);

  function handleSearch(newQuery: string) {
    setSearchParams(newQuery ? { q: newQuery } : {});
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <SearchBar initialValue={query} onSearch={handleSearch} autoFocus />
      </div>

      {!query && history.length > 0 && (
        <div className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-ink-700/60 dark:text-cream-200/50">
            {t("search.recentSearches")}:
          </span>
          {history.map((h) => (
            <button
              key={h}
              onClick={() => handleSearch(h)}
              className="rounded-full border border-cream-200 px-3 py-1 text-xs text-ink-700 hover:border-clay-300 dark:border-ink-700 dark:text-cream-200"
            >
              {h}
            </button>
          ))}
          <button
            onClick={clearHistory}
            className="text-xs text-ink-700/50 underline hover:text-ink-900 dark:text-cream-200/40 dark:hover:text-cream-100"
          >
            {t("search.clearRecent")}
          </button>
        </div>
      )}

      {!query && (
        <div className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-ink-700/60 dark:text-cream-200/50">
            {t("search.suggestionsTitle")}:
          </span>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => handleSearch(s)}
              className="rounded-full bg-clay-50 px-3 py-1 text-xs font-medium text-clay-700 hover:bg-clay-100 dark:bg-clay-800/30 dark:text-clay-200"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8">
        <FilterPanel filters={filters} onChange={setFilters} countries={countries} cuisines={cuisines} />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-cream-200 pb-4 dark:border-ink-700">
        <p className="text-sm text-ink-700/70 dark:text-cream-200/60">
          {query
            ? t("search.resultsFor", { query })
            : t(results.length === 1 ? "search.resultsCount_one" : "search.resultsCount_other", {
                count: results.length,
              })}
          {query &&
            ` (${t(results.length === 1 ? "search.resultsCount_one" : "search.resultsCount_other", {
              count: results.length,
            })})`}
        </p>
        <label className="flex items-center gap-2 text-sm text-ink-700 dark:text-cream-200">
          {t("search.sortBy")}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-lg border border-cream-200 bg-white px-2 py-1.5 text-sm dark:border-ink-700 dark:bg-ink-800 dark:text-cream-100"
          >
            <option value="relevance">{t("search.sortRelevance")}</option>
            <option value="quickest">{t("search.sortQuickest")}</option>
            <option value="az">{t("search.sortAZ")}</option>
          </select>
        </label>
      </div>

      <div className="mt-8">
        {results.length === 0 ? (
          <EmptyState
            title={t("search.noResults")}
            hint={t("search.noResultsHint")}
            action={
              <button
                onClick={() => {
                  setFilters({});
                  handleSearch("");
                }}
                className="rounded-full bg-clay-500 px-5 py-2 text-sm font-medium text-white hover:bg-clay-600"
              >
                {t("search.clearFilters")}
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
