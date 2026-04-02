"use server";

import { RecipeThumbnail } from "@/components/atoms/RecipeThumbnail";
import { RecipeIngredientsSection } from "@/components/molecules/info-display/RecipeIngredientsSection";
import { RecipeNotesInput } from "@/components/molecules/inputs/RecipeNotesInput";
import { LikeButton } from "@/components/molecules/buttons/LikeButton";
import { ClientProvidersWrapper } from "@/components/providers/ProvidersWrapper";
import { RecipeFullInfoDto } from "@/types/api";
import { User } from "@prisma/client";
import { AuthorControls } from "./AuthorControlsClient";
import { getCurrentUserOwnedCircles } from "@/lib/server-actions/recipes/getCurrentUserOwnedCircles";

export const SideBarRecipeSummary = async ({
  recipe,
  initialNote,
  user,
  isLiked,
}: {
  recipe: RecipeFullInfoDto;
  initialNote?: string;
  user?: User;
  isLiked?: boolean;
}) => {
  const circles = await getCurrentUserOwnedCircles();

  return (
    <div className="flex flex-col gap-8 md:max-w-80 w-full">
      <RecipeThumbnail recipe={recipe} />
      {recipe.authorId === user?.id && (
        <AuthorControls recipe={recipe} circles={circles} />
      )}
      {user && (
        <ClientProvidersWrapper>
          <LikeButton recipe={recipe} isLikedInitial={isLiked ?? false} full />
        </ClientProvidersWrapper>
      )}
      <RecipeIngredientsSection ingredients={recipe?.recipeIngredients ?? []} />
      {user && (
        <ClientProvidersWrapper>
          <RecipeNotesInput
            recipeId={recipe?.id ?? ""}
            initialNote={initialNote}
          />
        </ClientProvidersWrapper>
      )}
    </div>
  );
};
