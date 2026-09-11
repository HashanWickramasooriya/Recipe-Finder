export type MealType = "breakfast" | "lunch" | "dinner" | "snack" | "dessert";

export type DietaryTag =
  | "vegetarian"
  | "vegan"
  | "gluten-free"
  | "dairy-free"
  | "halal"
  | "pescatarian"
  | "contains-nuts";

export type Difficulty = "easy" | "medium" | "hard";

export interface NutritionInfo {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
}

export interface Recipe {
  id: string;
  name: string;
  nativeName?: string;
  countryCode: string;
  country: string;
  cuisine: string;
  region: "Asia" | "Middle East" | "Africa" | "Europe" | "Americas" | "Oceania";
  description: string;
  image: string;
  imageAlt: string;
  imageAttribution: string;
  mealType: MealType[];
  dietary: DietaryTag[];
  difficulty: Difficulty;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
  tips: string[];
  nutrition?: NutritionInfo;
  tags: string[];
  featured?: boolean;
  popular?: boolean;
}

export interface Country {
  code: string;
  name: string;
  region: Recipe["region"];
  cuisine: string;
  blurb: string;
}
