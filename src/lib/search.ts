import type { DietaryTag, Difficulty, MealType, Recipe } from "../types/recipe";

export interface RecipeFilters {
  query?: string;
  country?: string;
  cuisine?: string;
  mealType?: MealType;
  difficulty?: Difficulty;
  dietary?: DietaryTag;
  maxTotalTime?: number;
}

export type SortOption = "relevance" | "quickest" | "az";

function normalize(value: string): string {
  return value.toLowerCase().trim();
}

function matchesQuery(recipe: Recipe, query: string): boolean {
  const q = normalize(query);
  if (!q) return true;
  const haystacks = [
    recipe.name,
    recipe.nativeName ?? "",
    recipe.country,
    recipe.cuisine,
    recipe.description,
    ...recipe.ingredients,
    ...recipe.tags,
  ];
  return haystacks.some((h) => normalize(h).includes(q));
}

export function filterRecipes(recipes: Recipe[], filters: RecipeFilters): Recipe[] {
  return recipes.filter((recipe) => {
    if (filters.query && !matchesQuery(recipe, filters.query)) return false;
    if (filters.country && recipe.country !== filters.country) return false;
    if (filters.cuisine && recipe.cuisine !== filters.cuisine) return false;
    if (filters.mealType && !recipe.mealType.includes(filters.mealType)) return false;
    if (filters.difficulty && recipe.difficulty !== filters.difficulty) return false;
    if (filters.dietary && !recipe.dietary.includes(filters.dietary)) return false;
    if (
      filters.maxTotalTime &&
      recipe.prepTimeMinutes + recipe.cookTimeMinutes > filters.maxTotalTime
    )
      return false;
    return true;
  });
}

export function sortRecipes(recipes: Recipe[], sort: SortOption): Recipe[] {
  const copy = [...recipes];
  switch (sort) {
    case "quickest":
      return copy.sort(
        (a, b) =>
          a.prepTimeMinutes + a.cookTimeMinutes - (b.prepTimeMinutes + b.cookTimeMinutes),
      );
    case "az":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return copy;
  }
}

export function getSearchSuggestions(recipes: Recipe[], limit = 6): string[] {
  const featured = recipes.filter((r) => r.featured).map((r) => r.name);
  const unique = Array.from(new Set(featured));
  return unique.slice(0, limit);
}
