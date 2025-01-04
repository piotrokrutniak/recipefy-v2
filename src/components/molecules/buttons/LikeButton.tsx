"use client";
import { Button } from "@/components/ui/button";
import { toggleLikedRecipe } from "@/hooks/api/users/mutations/useMutationToggleFavoriteRecipe";
import { cn } from "@/lib/utils";
import { Recipe } from "@prisma/client";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { useState, useTransition } from "react";

export const LikeButton = ({
  recipe,
  isLikedInitial,
}: {
  recipe: Recipe;
  isLikedInitial: boolean;
}) => {
  const [isLiked, setIsLiked] = useState(isLikedInitial);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      setIsLiked(!isLiked);
      await toggleLikedRecipe(recipe);
    });
  };

  return (
    <Button
      disabled={isPending}
      className="w-9 disabled:cursor-not-allowed"
      variant={"ghost"}
      onClick={handleClick}
    >
      {isLiked ? (
        <HeartFilledIcon className={cn("w-6 h-6 text-red-400 flex-shrink-0")} />
      ) : (
        <HeartIcon className={cn("w-6 h-6 text-red-400 flex-shrink-0")} />
      )}
    </Button>
  );
};
