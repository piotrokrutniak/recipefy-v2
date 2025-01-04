import { OutlineContainer } from "@/components/atoms/OutlineContainer";
import { TextH3, TextH4, TextP } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { RecipeIngredientDto } from "@/types/api";
import { CopyToClipboardButton } from "../buttons/CopyToClipboardButton";

export const RecipeIngredientsSection = ({
  ingredients,
}: {
  ingredients: RecipeIngredientDto[];
}) => {
  if (!ingredients.length) {
    return null;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      "Ingredients: \n" +
        ingredients.map((ingredient) => ingredient.ingredient.name).join(", ")
    );
  };

  return (
    <OutlineContainer className="flex p-4 flex-col gap-2">
      <div className="flex justify-between items-center">
        <TextH4>Ingredients</TextH4>
        <CopyToClipboardButton
          text={ingredients
            .map(
              (ingredient) =>
                ingredient.ingredient.name + " - " + ingredient.amount
            )
            .join("\n")}
        />
      </div>
      <ul className="ml-4">
        {ingredients.map((recipeIngredient) => (
          <li className="flex gap-1 items-center" key={recipeIngredient.id}>
            <TextP noLeading>{`• ${recipeIngredient.ingredient.name}`}</TextP>
            {recipeIngredient.amount && (
              <TextP noLeading>{` - ${recipeIngredient.amount}`}</TextP>
            )}
          </li>
        ))}
      </ul>
    </OutlineContainer>
  );
};
