import { Ingredient, Recipe } from "@prisma/client";

export const testRecipe = {
  id: "cm3vr1aty000nexo4plvyif1t",
  title: "Mom's Spaghetti",
  content:
    "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ",
  authorId: "cm27une4b00009d6b78945zia",
  visibility: "PRIVATE",
  cookTime: 20,
  prepTime: 20,
  servings: 2,
  calories: 0,
  vegan: false,
  vegetarian: false,
  verifiedIngredients: false,
} as Recipe;

export const testIngredients: Ingredient[] = [
  {
    id: "cm3vr1aty000nexo4plvyif1t1",
    name: "Ingredient 1",
    vegan: false,
    vegetarian: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "cm3vr1aty000nexo4plvyif1t2",
    name: "Ingredient 2",
    vegan: false,
    vegetarian: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "cm3vr1aty000nexo4plvyif1t3",
    name: "Ingredient 3",
    vegan: false,
    vegetarian: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "cm3vr1aty000nexo4plvyif1t4",
    name: "Ingredient 4",
    vegan: false,
    vegetarian: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "cm3vr1aty000nexo4plvyif1t5",
    name: "Ingredient 5",
    vegan: false,
    vegetarian: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "cm3vr1aty000nexo4plvyif1t6",
    name: "Ingredient 6",
    vegan: false,
    vegetarian: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
