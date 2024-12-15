"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

export type RecipeSearchFormData = {
  query: string;
  cookTime: number;
  prepTime: number;
  calories: number;
  ingredients: string[];
  vegan: boolean;
  vegetarian: boolean;
  ignoreBlacklistedIngredients: boolean;
};

const searchRecipesSchema = z.object({
  query: z.string().optional(),
  cookTime: z.coerce.number().optional(),
  prepTime: z.coerce.number().optional(),
  calories: z.coerce.number().optional(),
  ingredients: z.array(z.string()).optional(),
  vegan: z.boolean().optional(),
  vegetarian: z.boolean().optional(),
  ignoreBlacklistedIngredients: z.boolean().optional(),
});

type DefaultParams = Partial<RecipeSearchFormData>;

export const useSearchRecipesForm = (defaultParams: DefaultParams) => {
  const form = useForm<RecipeSearchFormData>({
    resolver: zodResolver(searchRecipesSchema),
    defaultValues: {
      query: "",
      cookTime: 0,
      prepTime: 0,
      calories: 0,
      ingredients: ["fagwegwer123", "fagwegwer1224"],
      vegan: false,
      vegetarian: false,
      ignoreBlacklistedIngredients: false,
      ...defaultParams,
    },
  });

  return form;
};
