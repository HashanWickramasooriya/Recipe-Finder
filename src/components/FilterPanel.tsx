import { useTranslation } from "react-i18next";
import type { RecipeFilters } from "../lib/search";
import type { DietaryTag, Difficulty, MealType } from "../types/recipe";

interface FilterPanelProps {
  filters: RecipeFilters;
  onChange: (filters: RecipeFilters) => void;
  countries: string[];
  cuisines: string[];
}

const MEAL_TYPES: MealType[] = ["breakfast", "lunch", "dinner", "snack", "dessert"];
const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];
const DIETARY_TAGS: DietaryTag[] = [
  "vegetarian",
  "vegan",
  "gluten-free",
  "dairy-free",
  "halal",
  "pescatarian",
  "contains-nuts",
];

function selectClass() {
  return "w-full rounded-lg border border-cream-200 bg-white px-3 py-2 text-sm text-ink-900 outline-none focus:border-clay-400 dark:border-ink-700 dark:bg-ink-800 dark:text-cream-100";
}

export function FilterPanel({ filters, onChange, countries, cuisines }: FilterPanelProps) {
  const { t } = useTranslation();

  function update<K extends keyof RecipeFilters>(key: K, value: RecipeFilters[K]) {
    onChange({ ...filters, [key]: value || undefined });
  }

  const hasActiveFilters = Boolean(
    filters.country || filters.cuisine || filters.mealType || filters.difficulty || filters.dietary || filters.maxTotalTime,
  );

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      <div>
        <label className="mb-1 block text-xs font-medium text-ink-700/70 dark:text-cream-200/60">
          {t("filters.country")}
        </label>
        <select
          className={selectClass()}
          value={filters.country ?? ""}
          onChange={(e) => update("country", e.target.value)}
        >
          <option value="">{t("filters.allCountries")}</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-ink-700/70 dark:text-cream-200/60">
          {t("filters.cuisine")}
        </label>
        <select
          className={selectClass()}
          value={filters.cuisine ?? ""}
          onChange={(e) => update("cuisine", e.target.value)}
        >
          <option value="">{t("filters.allCuisines")}</option>
          {cuisines.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-ink-700/70 dark:text-cream-200/60">
          {t("filters.mealType")}
        </label>
        <select
          className={selectClass()}
          value={filters.mealType ?? ""}
          onChange={(e) => update("mealType", (e.target.value || undefined) as MealType | undefined)}
        >
          <option value="">{t("filters.anyMealType")}</option>
          {MEAL_TYPES.map((m) => (
            <option key={m} value={m}>
              {t(`filters.mealType.${m}`)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-ink-700/70 dark:text-cream-200/60">
          {t("filters.difficulty")}
        </label>
        <select
          className={selectClass()}
          value={filters.difficulty ?? ""}
          onChange={(e) => update("difficulty", (e.target.value || undefined) as Difficulty | undefined)}
        >
          <option value="">{t("filters.anyDifficulty")}</option>
          {DIFFICULTIES.map((d) => (
            <option key={d} value={d}>
              {t(`filters.difficulty.${d}`)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-ink-700/70 dark:text-cream-200/60">
          {t("filters.dietary")}
        </label>
        <select
          className={selectClass()}
          value={filters.dietary ?? ""}
          onChange={(e) => update("dietary", (e.target.value || undefined) as DietaryTag | undefined)}
        >
          <option value="">{t("filters.anyDiet")}</option>
          {DIETARY_TAGS.map((d) => (
            <option key={d} value={d}>
              {t(`filters.dietary.${d}`)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-ink-700/70 dark:text-cream-200/60">
          {t("filters.prepTime")}
        </label>
        <select
          className={selectClass()}
          value={filters.maxTotalTime ?? ""}
          onChange={(e) => update("maxTotalTime", e.target.value ? Number(e.target.value) : undefined)}
        >
          <option value=""></option>
          <option value="30">{t("filters.under30")}</option>
          <option value="60">{t("filters.under60")}</option>
          <option value="9999">{t("filters.over60")}</option>
        </select>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={() => onChange({ query: filters.query })}
          className="col-span-2 rounded-lg border border-cream-200 px-3 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-cream-100 dark:border-ink-700 dark:text-cream-200 dark:hover:bg-ink-700 sm:col-span-1 lg:col-span-1"
        >
          {t("filters.reset")}
        </button>
      )}
    </div>
  );
}
