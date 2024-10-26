import { Ingredient } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useQueryGetBlacklistedIngredients = () => {
  return useQuery({
    queryKey: ["currentUser", "blacklistedIngredients"],
    queryFn: async () => {
      const response = await fetch(`/api/users/current/blacklisted-ingredients`);
      return await response.json() as Ingredient[];
    },
  })
};