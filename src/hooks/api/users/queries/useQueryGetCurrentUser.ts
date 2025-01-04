import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useQueryGetCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await fetch("/api/users/current");
      const data = await response.json();
      console.log("currentUser data", data);
      return data as User;
    },
  });
};
