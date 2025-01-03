import { RecipeThumbnail } from "@/components/atoms/RecipeThumbnail";
import { RecipeIngredientsSection } from "@/components/molecules/info-display/RecipeIngredientsSection";
import { RecipeNotesInput } from "@/components/molecules/inputs/RecipeNotesInput";
import { ClientProvidersWrapper } from "@/components/providers/ProvidersWrapper";
import { RecipeFullInfoDto } from "@/types/api";

export const SideBarRecipeSummary = ({
  recipe,
  initialNote,
}: {
  recipe?: RecipeFullInfoDto;
  initialNote?: string;
}) => {
  return (
    <div className="flex flex-col gap-8 max-w-80 w-full">
      <RecipeThumbnail recipe={recipe} />
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
