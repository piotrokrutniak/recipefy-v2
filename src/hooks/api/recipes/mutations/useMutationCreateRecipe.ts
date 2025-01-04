import { ApiClient } from "@/lib/axios";
import { CreateRecipeDto } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export const useMutationCreateRecipe = () => {
  return useMutation({
    mutationKey: ["createRecipe"],
    mutationFn: (recipe: CreateRecipeDto) => {
      return ApiClient.post("/api/recipes", recipe);
    },
  });
};
