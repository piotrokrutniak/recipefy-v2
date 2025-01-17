"use server";

import { RecipeThumbnail } from "@/components/atoms/RecipeThumbnail";
import { ManageRecipeCirclesDialog } from "@/components/molecules/dialogs/ManageRecipeCirclesDialog";
import { RecipeIngredientsSection } from "@/components/molecules/info-display/RecipeIngredientsSection";
import { RecipeNotesInput } from "@/components/molecules/inputs/RecipeNotesInput";
import { AssignCirclesToRecipeForm } from "@/components/organisms/forms/AssignCirclesToRecipeForm";
import { ClientProvidersWrapper } from "@/components/providers/ProvidersWrapper";
import { getUserOwnedCircles } from "@/lib/server-actions/recipes/getUserOwnedCircles";
import { RecipeFullInfoDto } from "@/types/api";
import { User } from "@prisma/client";
import { AuthorControls } from "./AuthorControlsClient";

export const SideBarRecipeSummary = async ({
  recipe,
  initialNote,
  user,
}: {
  recipe: RecipeFullInfoDto;
  initialNote?: string;
  user?: User;
}) => {
  const circles = await getUserOwnedCircles();

  return (
    <div className="flex flex-col gap-8 max-w-80 w-full">
      <RecipeThumbnail recipe={recipe} />
      {recipe.authorId === user?.id && (
        <AuthorControls recipe={recipe} circles={circles} />
      )}
      <RecipeIngredientsSection ingredients={recipe?.recipeIngredients ?? []} />
      <ClientProvidersWrapper>
        <RecipeNotesInput
          recipeId={recipe?.id ?? ""}
          initialNote={initialNote}
        />
      </ClientProvidersWrapper>
    </div>
  );
};
