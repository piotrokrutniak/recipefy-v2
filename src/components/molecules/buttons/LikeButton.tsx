"use client";
import { Button } from "@/components/ui/button";
import { toggleLikedRecipe } from "@/hooks/api/users/mutations/useMutationToggleFavoriteRecipe";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Recipe } from "@prisma/client";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";

export const LikeButton = ({
  recipe,
  isLikedInitial,
  full,
}: {
  recipe: Recipe;
  isLikedInitial: boolean;
  full?: boolean;
}) => {
  const [isLiked, setIsLiked] = useState(isLikedInitial);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const t = useTranslations("recipes.likes");

  const handleClick = () => {
    const next = !isLiked;
    startTransition(async () => {
      setIsLiked(next);
      await toggleLikedRecipe(recipe);
      toast({ title: next ? t("added") : t("removed") });
    });
  };

  if (full) {
    return (
      <Button
        disabled={isPending}
        variant={isLiked ? "default" : "outline"}
        className={cn("w-full gap-2 disabled:cursor-not-allowed", isLiked && "bg-red-500 hover:bg-red-600 border-red-500")}
        onClick={handleClick}
      >
        <Heart className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} />
        {isLiked ? t("liked") : t("like")}
      </Button>
    );
  }

  return (
    <Button
      disabled={isPending}
      className="w-9 disabled:cursor-not-allowed"
      variant={"ghost"}
      onClick={handleClick}
    >
      <Heart
        className={cn("w-5 h-5 flex-shrink-0 text-red-400")}
        fill={isLiked ? "currentColor" : "none"}
      />
    </Button>
  );
};
