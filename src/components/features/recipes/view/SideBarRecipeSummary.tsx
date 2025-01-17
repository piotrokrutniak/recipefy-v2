"use server";

import { RecipeThumbnail } from "@/components/atoms/RecipeThumbnail";
import { RecipeIngredientsSection } from "@/components/molecules/info-display/RecipeIngredientsSection";
import { RecipeNotesInput } from "@/components/molecules/inputs/RecipeNotesInput";
import { AssignCirclesToRecipeForm } from "@/components/organisms/forms/AssignCirclesToRecipeForm";
import { ClientProvidersWrapper } from "@/components/providers/ProvidersWrapper";
import { getUserOwnedCircles } from "@/lib/server-actions/recipes/getUserOwnedCircles";
import { RecipeFullInfoDto } from "@/types/api";

export const SideBarRecipeSummary = async ({
  recipe,
  initialNote,
}: {
  recipe?: RecipeFullInfoDto;
  initialNote?: string;
}) => {
  const circles = await getUserOwnedCircles();

  console.log(recipe?.circleRecipes);
  console.log(circles);

  return (
    <div className="flex flex-col gap-8 max-w-80 w-full">
      <RecipeThumbnail recipe={recipe} />
      <AssignCirclesToRecipeForm
        recipeId={recipe?.id ?? ""}
        circles={circles}
        circleIds={recipe?.circleRecipes.map((cr) => cr.circleId) ?? []}
      />
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
