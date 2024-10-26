import { UpdateUserDto } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export const useMutationUpdateUser = () => {
  return useMutation({
    mutationKey: ["updateUser"],
    // mutationFn: (data: UpdateUserDto) => {
    //   return;
    // }
  })
};