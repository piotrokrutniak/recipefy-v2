import { ApiClient } from "@/lib/axios";
import { UpdateRecipeDto } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export const useMutationEditRecipe = () => {
  return useMutation({
    mutationKey: ["editRecipe"],
    mutationFn: (recipe: UpdateRecipeDto) => {
      return ApiClient.patch(`/api/recipes/${recipe.id}`, recipe);
    },
  });
};
