import { OutlineContainer } from "@/components/atoms/OutlineContainer";
import { TextH4, TextP } from "@/components/typography";
import { RecipeIngredientDto } from "@/types/api";
import { CopyToClipboardButton } from "../buttons/CopyToClipboardButton";
import { useMemo } from "react";

export const RecipeIngredientsSection = ({
  ingredients,
}: {
  ingredients: RecipeIngredientDto[];
}) => {
  const memoizedIngredients = useMemo(() => {
    return ingredients.filter((i) => !!i.ingredient || !!i.userIngredient);
  }, [ingredients]);

  if (!memoizedIngredients.length) {
    return null;
  }

  return (
    <OutlineContainer className="flex p-4 flex-col gap-2">
      <div className="flex justify-between items-center">
        <TextH4>Ingredients</TextH4>
        <CopyToClipboardButton
          text={memoizedIngredients
            .map(
              (ingredient) =>
                (ingredient.ingredient?.name ||
                  ingredient.userIngredient?.name) +
                " - " +
                ingredient.amount
            )
            .join("\n")}
        />
      </div>
      <ul className="ml-4">
        {memoizedIngredients.map((recipeIngredient) => (
          <li className="flex gap-1 items-center" key={recipeIngredient.id}>
            <TextP noLeading>{`• ${
              recipeIngredient.ingredient?.name ||
              recipeIngredient.userIngredient?.name
            }`}</TextP>
            {recipeIngredient.amount && (
              <TextP noLeading>{` - ${recipeIngredient.amount}`}</TextP>
            )}
          </li>
        ))}
      </ul>
    </OutlineContainer>
  );
};
