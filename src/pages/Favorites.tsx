import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { useRecentlyViewedStore } from "../store/useRecentlyViewedStore";
import { useShoppingListStore } from "../store/useShoppingListStore";
import { getRecipeById } from "../data/recipes";
import { RecipeCard } from "../components/RecipeCard";
import { EmptyState } from "../components/EmptyState";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export default function Favorites() {
  const { t } = useTranslation();
  useDocumentTitle("Favorites", "Your saved recipes, recently viewed dishes, and shopping list.");
  const favoriteIds = useFavoritesStore((s) => s.favoriteIds);
  const recentIds = useRecentlyViewedStore((s) => s.recentIds);
  const clearRecent = useRecentlyViewedStore((s) => s.clearRecent);
  const shoppingItems = useShoppingListStore((s) => s.items);
  const toggleItem = useShoppingListStore((s) => s.toggleItem);
  const removeItem = useShoppingListStore((s) => s.removeItem);
  const clearList = useShoppingListStore((s) => s.clearList);

  const favorites = favoriteIds.map(getRecipeById).filter((r): r is NonNullable<typeof r> => Boolean(r));
  const recent = recentIds.map(getRecipeById).filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-cream-100">
        {t("favorites.title")}
      </h1>
      <p className="mt-1 text-sm text-ink-700/70 dark:text-cream-200/60">{t("favorites.subtitle")}</p>

      <section className="mt-8">
        {favorites.length === 0 ? (
          <EmptyState
            title={t("favorites.empty")}
            hint={t("favorites.emptyHint")}
            action={
              <Link
                to="/search"
                className="rounded-full bg-clay-500 px-5 py-2 text-sm font-medium text-white hover:bg-clay-600"
              >
                {t("favorites.browseRecipes")}
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {favorites.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-cream-100">
          {t("favorites.recentlyViewed")}
        </h2>
        {recent.length === 0 ? (
          <p className="mt-3 text-sm text-ink-700/60 dark:text-cream-200/50">{t("favorites.recentlyViewedEmpty")}</p>
        ) : (
          <>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {recent.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
            <button
              onClick={clearRecent}
              className="mt-4 text-sm text-ink-700/60 underline hover:text-ink-900 dark:text-cream-200/50 dark:hover:text-cream-100"
            >
              {t("favorites.clearShoppingList")}
            </button>
          </>
        )}
      </section>

      <section className="mt-14">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-cream-100">
            {t("favorites.shoppingList")}
          </h2>
          {shoppingItems.length > 0 && (
            <button
              onClick={clearList}
              className="text-sm text-ink-700/60 underline hover:text-ink-900 dark:text-cream-200/50 dark:hover:text-cream-100"
            >
              {t("favorites.clearShoppingList")}
            </button>
          )}
        </div>
        {shoppingItems.length === 0 ? (
          <EmptyState title={t("favorites.shoppingListEmpty")} hint={t("favorites.shoppingListEmptyHint")} />
        ) : (
          <ul className="mt-4 divide-y divide-cream-200 rounded-xl border border-cream-200 bg-white dark:divide-ink-700 dark:border-ink-700 dark:bg-ink-800">
            {shoppingItems.map((item) => (
              <li key={item.id} className="flex items-center gap-3 px-4 py-3">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleItem(item.id)}
                  className="h-4 w-4 shrink-0 accent-clay-500"
                />
                <div className="flex-1">
                  <p
                    className={`text-sm ${
                      item.checked
                        ? "text-ink-700/40 line-through dark:text-cream-200/30"
                        : "text-ink-800 dark:text-cream-100"
                    }`}
                  >
                    {item.text}
                  </p>
                  <p className="text-xs text-ink-700/50 dark:text-cream-200/40">{item.recipeName}</p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label={t("favorites.removeItem") ?? ""}
                  className="text-ink-700/40 hover:text-clay-600 dark:text-cream-200/40 dark:hover:text-clay-300"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
                    <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
