import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getRecipeById, getRelatedRecipes } from "../data/recipes";
import { RecipeImage } from "../components/RecipeImage";
import { FavoriteButton } from "../components/FavoriteButton";
import { RecipeCard } from "../components/RecipeCard";
import { formatMinutes } from "../lib/format";
import { useRecentlyViewedStore } from "../store/useRecentlyViewedStore";
import { useShoppingListStore } from "../store/useShoppingListStore";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import NotFound from "./NotFound";

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const recipe = useMemo(() => getRecipeById(id ?? ""), [id]);
  const addRecent = useRecentlyViewedStore((s) => s.addRecent);
  const addItems = useShoppingListStore((s) => s.addItems);
  useDocumentTitle(recipe?.name, recipe?.description);

  const [servings, setServings] = useState(recipe?.servings ?? 1);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [cookingMode, setCookingMode] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [addedToList, setAddedToList] = useState(false);

  useEffect(() => {
    if (recipe) addRecent(recipe.id);
  }, [recipe, addRecent]);

  if (!recipe) return <NotFound />;

  const related = getRelatedRecipes(recipe);
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  function toggleIngredient(i: number) {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function toggleStep(i: number) {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  async function handleShare() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: recipe!.name, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch {
      // user cancelled share or clipboard unavailable; no action needed
    }
  }

  function handleAddToShoppingList() {
    addItems(recipe!.name, recipe!.ingredients);
    setAddedToList(true);
    setTimeout(() => setAddedToList(false), 2000);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/search" className="no-print text-sm font-medium text-clay-600 hover:text-clay-700 dark:text-clay-300">
        &larr; {t("recipe.backToRecipes")}
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-100 dark:bg-ink-700">
            <RecipeImage src={recipe.image} alt={recipe.imageAlt} className="h-full w-full" priority />
            <FavoriteButton recipeId={recipe.id} className="no-print absolute right-4 top-4" />
          </div>
        </div>

        <div className="lg:col-span-2">
          <p className="text-sm font-medium text-clay-600 dark:text-clay-300">
            {recipe.country} &middot; {recipe.cuisine}
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-ink-900 dark:text-cream-100">
            {recipe.name}
          </h1>
          {recipe.nativeName && (
            <p className="mt-1 text-base text-ink-700/60 dark:text-cream-200/50">{recipe.nativeName}</p>
          )}
          <p className="mt-3 text-sm text-ink-700/80 dark:text-cream-200/70">{recipe.description}</p>

          <dl className="mt-5 grid grid-cols-2 gap-4 rounded-xl border border-cream-200 bg-cream-50 p-4 text-sm dark:border-ink-700 dark:bg-ink-800">
            <div>
              <dt className="text-ink-700/60 dark:text-cream-200/50">{t("recipe.prepTime")}</dt>
              <dd className="font-medium text-ink-900 dark:text-cream-100">{formatMinutes(recipe.prepTimeMinutes)}</dd>
            </div>
            <div>
              <dt className="text-ink-700/60 dark:text-cream-200/50">{t("recipe.cookTime")}</dt>
              <dd className="font-medium text-ink-900 dark:text-cream-100">{formatMinutes(recipe.cookTimeMinutes)}</dd>
            </div>
            <div>
              <dt className="text-ink-700/60 dark:text-cream-200/50">{t("recipe.totalTime")}</dt>
              <dd className="font-medium text-ink-900 dark:text-cream-100">{formatMinutes(totalTime)}</dd>
            </div>
            <div>
              <dt className="text-ink-700/60 dark:text-cream-200/50">{t("recipe.difficulty")}</dt>
              <dd className="font-medium capitalize text-ink-900 dark:text-cream-100">
                {t(`filters.difficulty.${recipe.difficulty}`)}
              </dd>
            </div>
          </dl>

          <div className="mt-5 flex items-center justify-between rounded-xl border border-cream-200 bg-cream-50 p-4 dark:border-ink-700 dark:bg-ink-800">
            <span className="text-sm font-medium text-ink-900 dark:text-cream-100">{t("recipe.servingsAdjust")}</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setServings((s) => Math.max(1, s - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-cream-300 text-ink-800 hover:bg-cream-100 dark:border-ink-600 dark:text-cream-100 dark:hover:bg-ink-700"
                aria-label="-"
              >
                &minus;
              </button>
              <span className="w-6 text-center font-medium text-ink-900 dark:text-cream-100">{servings}</span>
              <button
                type="button"
                onClick={() => setServings((s) => s + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-cream-300 text-ink-800 hover:bg-cream-100 dark:border-ink-600 dark:text-cream-100 dark:hover:bg-ink-700"
                aria-label="+"
              >
                +
              </button>
            </div>
          </div>

          <div className="no-print mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCookingMode(true)}
              className="rounded-full bg-clay-500 px-4 py-2 text-sm font-medium text-white hover:bg-clay-600"
            >
              {t("recipe.cookingMode")}
            </button>
            <button
              type="button"
              onClick={handleAddToShoppingList}
              className="rounded-full border border-cream-300 px-4 py-2 text-sm font-medium text-ink-800 hover:bg-cream-100 dark:border-ink-600 dark:text-cream-100 dark:hover:bg-ink-700"
            >
              {addedToList ? t("recipe.addedToShoppingList") : t("recipe.shoppingList")}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-full border border-cream-300 px-4 py-2 text-sm font-medium text-ink-800 hover:bg-cream-100 dark:border-ink-600 dark:text-cream-100 dark:hover:bg-ink-700"
            >
              {t("recipe.print")}
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="rounded-full border border-cream-300 px-4 py-2 text-sm font-medium text-ink-800 hover:bg-cream-100 dark:border-ink-600 dark:text-cream-100 dark:hover:bg-ink-700"
            >
              {shareCopied ? t("recipe.linkCopied") : t("recipe.share")}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-cream-100">
            {t("recipe.ingredients")}
          </h2>
          <p className="no-print mt-1 text-xs text-ink-700/60 dark:text-cream-200/50">
            {t("recipe.checkAllIngredients")}
          </p>
          <ul className="mt-4 space-y-2">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>
                <label className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-1.5 hover:bg-cream-100 dark:hover:bg-ink-800">
                  <input
                    type="checkbox"
                    checked={checkedIngredients.has(i)}
                    onChange={() => toggleIngredient(i)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-clay-500"
                  />
                  <span
                    className={`text-sm ${
                      checkedIngredients.has(i)
                        ? "text-ink-700/40 line-through dark:text-cream-200/30"
                        : "text-ink-800 dark:text-cream-100"
                    }`}
                  >
                    {ing}
                  </span>
                </label>
              </li>
            ))}
          </ul>

          {recipe.nutrition && (
            <div className="mt-8 rounded-xl border border-cream-200 bg-cream-50 p-4 dark:border-ink-700 dark:bg-ink-800">
              <h3 className="text-sm font-semibold text-ink-900 dark:text-cream-100">{t("recipe.nutrition")}</h3>
              <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-700/60 dark:text-cream-200/50">{t("recipe.calories")}</dt>
                  <dd className="font-medium text-ink-900 dark:text-cream-100">{recipe.nutrition.calories}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-700/60 dark:text-cream-200/50">{t("recipe.protein")}</dt>
                  <dd className="font-medium text-ink-900 dark:text-cream-100">{recipe.nutrition.protein}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-700/60 dark:text-cream-200/50">{t("recipe.carbs")}</dt>
                  <dd className="font-medium text-ink-900 dark:text-cream-100">{recipe.nutrition.carbs}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-700/60 dark:text-cream-200/50">{t("recipe.fat")}</dt>
                  <dd className="font-medium text-ink-900 dark:text-cream-100">{recipe.nutrition.fat}</dd>
                </div>
              </dl>
            </div>
          )}

          {recipe.dietary.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-ink-900 dark:text-cream-100">{t("recipe.dietaryInfo")}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {recipe.dietary.map((d) => (
                  <span
                    key={d}
                    className="rounded-full bg-sage-500/10 px-3 py-1 text-xs font-medium text-sage-600 dark:bg-sage-500/15 dark:text-sage-500"
                  >
                    {t(`filters.dietary.${d}`)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-cream-100">
            {t("recipe.instructions")}
          </h2>
          <ol className="mt-4 space-y-4">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex gap-4">
                <button
                  type="button"
                  onClick={() => toggleStep(i)}
                  aria-label={t("recipe.markStepDone") ?? ""}
                  className={`no-print mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                    completedSteps.has(i)
                      ? "border-clay-500 bg-clay-500 text-white"
                      : "border-cream-300 text-ink-700 dark:border-ink-600 dark:text-cream-200"
                  }`}
                >
                  {completedSteps.has(i) ? "✓" : i + 1}
                </button>
                <span
                  className={`hidden print:inline text-sm font-semibold text-ink-900`}
                >
                  {i + 1}.
                </span>
                <p
                  className={`text-sm leading-relaxed ${
                    completedSteps.has(i)
                      ? "text-ink-700/40 dark:text-cream-200/30"
                      : "text-ink-800 dark:text-cream-100"
                  }`}
                >
                  {step}
                </p>
              </li>
            ))}
          </ol>

          {recipe.tips.length > 0 && (
            <div className="mt-8">
              <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-cream-100">
                {t("recipe.tips")}
              </h3>
              <ul className="mt-3 space-y-2">
                {recipe.tips.map((tip, i) => (
                  <li
                    key={i}
                    className="rounded-lg border-l-4 border-clay-400 bg-clay-50 px-4 py-2.5 text-sm text-ink-800 dark:border-clay-500 dark:bg-clay-800/20 dark:text-cream-100"
                  >
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="no-print mt-14">
          <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-cream-100">
            {t("recipe.relatedRecipes")}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </div>
      )}

      {cookingMode && (
        <CookingModeOverlay
          recipeName={recipe.name}
          steps={recipe.instructions}
          completedSteps={completedSteps}
          onToggleStep={toggleStep}
          onClose={() => setCookingMode(false)}
        />
      )}
    </div>
  );
}

interface CookingModeOverlayProps {
  recipeName: string;
  steps: string[];
  completedSteps: Set<number>;
  onToggleStep: (i: number) => void;
  onClose: () => void;
}

function CookingModeOverlay({ recipeName, steps, completedSteps, onToggleStep, onClose }: CookingModeOverlayProps) {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-ink-900 text-cream-100">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <span className="font-display text-lg font-semibold">{recipeName}</span>
        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10"
          aria-label={t("recipe.exitCookingMode") ?? ""}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
            <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-10 text-center">
        <span className="text-sm font-medium uppercase tracking-wide text-clay-300">
          {t("recipe.step", { number: current + 1 })} / {steps.length}
        </span>
        <p className="max-w-2xl text-2xl font-medium leading-relaxed sm:text-3xl">{steps[current]}</p>
        <button
          type="button"
          onClick={() => onToggleStep(current)}
          className={`rounded-full px-5 py-2 text-sm font-medium ${
            completedSteps.has(current) ? "bg-clay-500 text-white" : "border border-white/30 text-cream-100"
          }`}
        >
          {t("recipe.markStepDone")}
        </button>
      </div>
      <div className="flex items-center justify-center gap-4 border-t border-white/10 px-5 py-5">
        <button
          type="button"
          disabled={current === 0}
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          className="rounded-full border border-white/30 px-5 py-2 text-sm font-medium disabled:opacity-30"
        >
          {t("common.back")}
        </button>
        <button
          type="button"
          disabled={current === steps.length - 1}
          onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}
          className="rounded-full bg-clay-500 px-5 py-2 text-sm font-medium text-white disabled:opacity-30"
        >
          {t("recipe.step", { number: current + 2 })}
        </button>
      </div>
    </div>
  );
}
