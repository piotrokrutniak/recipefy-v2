import { RecipeThumbnail } from "@/components/atoms/RecipeThumbnail";
import { Recipe } from "@prisma/client";

export const SideBarRecipeSummary = ({ recipe }: { recipe?: Recipe }) => {
  return (
    <div className="flex flex-col gap-3 max-w-80 w-full">
      <RecipeThumbnail recipe={recipe} />
      {/** TODO: Create extended recipe dto containing ingredients */}
      {/* <RecipeIngredientsSection ingredients={recipe?.ingredients} /> */}
    </div>
  );
};
