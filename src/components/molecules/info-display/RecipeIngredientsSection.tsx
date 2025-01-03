import { RecipeIngredientDto } from "@/types/api";

export const RecipeIngredientsSection = ({
  ingredients,
}: {
  ingredients: RecipeIngredientDto[];
}) => {
  return (
    <div className="flex flex-col gap-2">
      {ingredients.map((recipeIngredient) => (
        <div key={recipeIngredient.id}>{recipeIngredient.ingredient.name}</div>
      ))}
    </div>
  );
};
