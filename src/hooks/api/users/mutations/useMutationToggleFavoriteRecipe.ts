import { ApiClient } from "@/lib/axios";
import { Recipe } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

export const useMutationToggleLikedRecipe = () => {
  return useMutation({
    mutationKey: ["currentUser", "toggleLikedRecipe"],
    mutationFn: (recipe: Recipe) => {
      return toggleLikedRecipe(recipe);
    },
  });
};

export const toggleLikedRecipe = async (recipe: Recipe) => {
  const response = await ApiClient.put(
    `/api/users/current/liked-recipes/${recipe.id}`
  );
  return response.data;
};
