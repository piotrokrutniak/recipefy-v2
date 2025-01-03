import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useMutationAddRecipeNote = () => {
  return useMutation({
    mutationFn: ({ note, recipeId }: { note: string; recipeId: string }) => {
      return axios.patch(`/api/recipes/${recipeId}/add-note`, { note });
    },
  });
};
