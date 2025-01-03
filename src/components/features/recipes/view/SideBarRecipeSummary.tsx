import { RecipeThumbnail } from "@/components/atoms/RecipeThumbnail";
import { RecipeIngredientsSection } from "@/components/molecules/info-display/RecipeIngredientsSection";
import { RecipeFullInfoDto } from "@/types/api";

export const SideBarRecipeSummary = ({
  recipe,
}: {
  recipe?: RecipeFullInfoDto;
}) => {
  return (
    <div className="flex flex-col gap-3 max-w-80 w-full">
      <RecipeThumbnail recipe={recipe} />
      {/** TODO: Create extended recipe dto containing ingredients */}
      <RecipeIngredientsSection ingredients={recipe?.recipeIngredients ?? []} />
    </div>
  );
};
