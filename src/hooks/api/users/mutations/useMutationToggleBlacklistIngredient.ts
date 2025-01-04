import { ApiClient } from "@/lib/axios";
import { Ingredient } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

export const useMutationToggleBlacklistIngredient = () => {
  return useMutation({
    mutationKey: ["currentUser", "toggleBlacklistIngredient"],
    mutationFn: (ingredient: Ingredient) => {
      return ApiClient.post("/api/users/current/blacklisted-ingredients", ingredient);
    }
  });
};