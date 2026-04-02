"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MealType } from "@prisma/client";
import { z } from "zod";
import { useForm } from "react-hook-form";

export type RecipeSearchFormData = {
  query: string;
  cookTime: number | undefined;
  prepTime: number | undefined;
  calories: number | undefined;
  ingredients: string[];
  mealTypes: MealType[];
  vegan: boolean;
  vegetarian: boolean;
  includeBlacklistedRecipes: boolean;
};

const searchRecipesSchema = z.object({
  query: z.string().optional(),
  cookTime: z.coerce.number().optional(),
  prepTime: z.coerce.number().optional(),
  calories: z.coerce.number().optional(),
  ingredients: z.array(z.string()).optional(),
  mealTypes: z.array(z.nativeEnum(MealType)).optional(),
  vegan: z.boolean().optional(),
  vegetarian: z.boolean().optional(),
  includeBlacklistedRecipes: z.boolean().optional(),
});

type DefaultParams = Partial<RecipeSearchFormData>;

export const useSearchRecipesForm = (defaultParams: DefaultParams) => {
  const form = useForm<RecipeSearchFormData>({
    resolver: zodResolver(searchRecipesSchema),
    defaultValues: {
      query: "",
      cookTime: undefined,
      prepTime: undefined,
      calories: undefined,
      ingredients: [],
      mealTypes: [],
      vegan: false,
      vegetarian: false,
      includeBlacklistedRecipes: true,
      ...defaultParams,
    },
  });

  return form;
};
