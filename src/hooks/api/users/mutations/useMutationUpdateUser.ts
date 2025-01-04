import { ApiClient } from "@/lib/axios";
import { UpdateUserDto } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMutationUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateUser"],
    mutationFn: (data: UpdateUserDto) => {
      console.log(data);
      return ApiClient.put("/api/users/current", data);
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["currentUser"] });
    },
  });
};
