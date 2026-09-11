import type { Recipe } from "../../types/recipe";
import { asiaRecipes } from "./asia";
import { middleEastRecipes } from "./middleEast";
import { africaRecipes } from "./africa";
import { europeRecipes } from "./europe";
import { americasRecipes } from "./americas";
import { oceaniaRecipes } from "./oceania";

export const allRecipes: Recipe[] = [
  ...asiaRecipes,
  ...middleEastRecipes,
  ...africaRecipes,
  ...europeRecipes,
  ...americasRecipes,
  ...oceaniaRecipes,
];

export function getRecipeById(id: string): Recipe | undefined {
  return allRecipes.find((r) => r.id === id);
}

export function getRelatedRecipes(recipe: Recipe, limit = 4): Recipe[] {
  const sameCountry = allRecipes.filter(
    (r) => r.id !== recipe.id && r.country === recipe.country,
  );
  const sameCuisine = allRecipes.filter(
    (r) =>
      r.id !== recipe.id &&
      r.country !== recipe.country &&
      r.cuisine === recipe.cuisine,
  );
  const sameRegion = allRecipes.filter(
    (r) =>
      r.id !== recipe.id &&
      r.country !== recipe.country &&
      r.cuisine !== recipe.cuisine &&
      r.region === recipe.region,
  );
  return [...sameCountry, ...sameCuisine, ...sameRegion].slice(0, limit);
}
