"use server";

import { RecipeThumbnail } from "@/components/atoms/RecipeThumbnail";
import { RecipeIngredientsSection } from "@/components/molecules/info-display/RecipeIngredientsSection";
import { RecipeFullInfoDto } from "@/types/api";
import { Circle } from "@prisma/client";
import { SideBarUserActions } from "./SideBarUserActions";

export const SideBarRecipeSummary = async ({
  recipe,
  circles = [],
}: {
  recipe: RecipeFullInfoDto;
  circles?: Circle[];
}) => {
  return (
    <div className="flex flex-col gap-8 md:max-w-80 w-full">
      <RecipeThumbnail recipe={recipe} />
      <SideBarUserActions recipe={recipe} circles={circles} />
      <RecipeIngredientsSection ingredients={recipe?.recipeIngredients ?? []} />
    </div>
  );
};
