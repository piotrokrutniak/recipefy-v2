import { ApiClient } from "@/lib/axios";
import { CreateRecipeDto } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export const useMutationEditRecipe = () => {
  return useMutation({
    mutationKey: ["editRecipe"],
    mutationFn: (recipe: CreateRecipeDto) => {
      return ApiClient.patch(`/api/recipes/${recipe.id}`, recipe);
    },
  });
};
