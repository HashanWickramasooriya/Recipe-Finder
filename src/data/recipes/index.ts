import type { Recipe } from "../../types/recipe";
import { asiaRecipes } from "./asia";
import { asiaRecipes2 } from "./asia2";
import { asiaRecipes3 } from "./asia3";
import { asiaRecipes4 } from "./asia4";
import { asiaRecipes5 } from "./asia5";
import { middleEastRecipes } from "./middleEast";
import { middleEastRecipes2 } from "./middleEast2";
import { middleEastRecipes3 } from "./middleEast3";
import { middleEastRecipes4 } from "./middleEast4";
import { africaRecipes } from "./africa";
import { africaRecipes2 } from "./africa2";
import { africaRecipes3 } from "./africa3";
import { africaRecipes4 } from "./africa4";
import { africaRecipes5 } from "./africa5";
import { europeRecipes } from "./europe";
import { europeRecipes2 } from "./europe2";
import { europeRecipes3 } from "./europe3";
import { europeRecipes4 } from "./europe4";
import { europeRecipes5 } from "./europe5";
import { americasRecipes } from "./americas";
import { americasRecipes2 } from "./americas2";
import { americasRecipes3 } from "./americas3";
import { americasRecipes4 } from "./americas4";
import { americasRecipes5 } from "./americas5";
import { americasRecipes6 } from "./americas6";
import { oceaniaRecipes } from "./oceania";
import { oceaniaRecipes2 } from "./oceania2";
import { oceaniaRecipes3 } from "./oceania3";
import { oceaniaRecipes4 } from "./oceania4";

export const allRecipes: Recipe[] = [
  ...asiaRecipes,
  ...asiaRecipes2,
  ...asiaRecipes3,
  ...asiaRecipes4,
  ...asiaRecipes5,
  ...middleEastRecipes,
  ...middleEastRecipes2,
  ...middleEastRecipes3,
  ...middleEastRecipes4,
  ...africaRecipes,
  ...africaRecipes2,
  ...africaRecipes3,
  ...africaRecipes4,
  ...africaRecipes5,
  ...europeRecipes,
  ...europeRecipes2,
  ...europeRecipes3,
  ...europeRecipes4,
  ...europeRecipes5,
  ...americasRecipes,
  ...americasRecipes2,
  ...americasRecipes3,
  ...americasRecipes4,
  ...americasRecipes5,
  ...americasRecipes6,
  ...oceaniaRecipes,
  ...oceaniaRecipes2,
  ...oceaniaRecipes3,
  ...oceaniaRecipes4,
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
