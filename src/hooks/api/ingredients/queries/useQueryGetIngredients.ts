import { Ingredient } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useQueryGetIngredients = ({
  take = 25,
  skip = 0,
  query = "",
}: {
  take?: number;
  skip?: number;
  query?: string;
}) => {
  const params = new URLSearchParams({
    ["take"]: take.toString(),
    ["skip"]: skip.toString(),
    ["query"]: query,
  });

  return useQuery({
    queryKey: ["ingredients", take, skip, query],
    queryFn: async () => {
      const response = await fetch(`/api/ingredients?${params.toString()}`);
      return await response.json() as Ingredient[];
    },
  })
};