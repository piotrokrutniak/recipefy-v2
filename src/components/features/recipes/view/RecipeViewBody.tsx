import { TextH1 } from "@/components/typography/TextH1";
import { TextMedium } from "@/components/typography/TextMedium";
import { TextP } from "@/components/typography/TextP";
import { Recipe } from "@prisma/client";

export const RecipeViewBody = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <TextH1>{recipe.title}</TextH1>
      <div className="flex flex-col">
        <TextP noLeading>{`Prep Time: ${recipe.prepTime} minutes`}</TextP>
        <TextP noLeading>{`Cook Time: ${recipe.cookTime} minutes`}</TextP>
      </div>
      <TextMedium>{recipe.content}</TextMedium>
    </div>
  );
};
