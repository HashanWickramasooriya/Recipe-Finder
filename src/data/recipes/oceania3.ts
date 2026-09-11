import type { Recipe } from "../../types/recipe";

export const oceaniaRecipes3: Recipe[] = [
  {
    id: "tonga-ota-ika",
    name: "Ota Ika",
    countryCode: "TO",
    country: "Tonga",
    cuisine: "Tongan",
    region: "Oceania",
    description: "Fresh raw fish cured in citrus and mixed with coconut cream and vegetables, Tonga's take on the Pacific raw fish salad.",
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Ota_ika_%285737464134%29.jpg/500px-Ota_ika_%285737464134%29.jpg",
    imageAlt: "Ota ika raw fish salad",
    imageAttribution: "Wikimedia Commons",
    mealType: ["lunch"],
    dietary: ["pescatarian", "gluten-free", "dairy-free"],
    difficulty: "easy",
    prepTimeMinutes: 25,
    cookTimeMinutes: 0,
    servings: 4,
    ingredients: ["500g raw white fish, diced", "Lime juice", "Coconut cream", "Tomato, cucumber, onion"],
    instructions: [
      "Dice the fish and cover with lime juice until the surface turns opaque.",
      "Drain some of the lime juice.",
      "Fold in coconut cream and chopped vegetables.",
      "Chill briefly and serve cold.",
    ],
    tips: ["Cure the fish just enough to firm the surface; too long and it becomes rubbery."],
    nutrition: { calories: 260, protein: "26g", carbs: "8g", fat: "14g" },
    tags: ["pescatarian", "raw fish", "tongan"],
    featured: true,
  },
];
