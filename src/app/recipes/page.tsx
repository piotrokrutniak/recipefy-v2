import RecipeSearchForm from "@/components/organisms/forms/SearchRecipesForm";
import { RecipeSearchParams } from "../api/recipes/route";
import { RecipeListing } from "@/components/features/recipes/RecipeListing";
import { getCurrentUser } from "../api/users/current/route";
import { getIngredients } from "../api/ingredients/route";
import { getBlacklistedIngredients } from "../api/users/current/blacklisted-ingredients/route";
import { getRecipes } from "@/lib/server-actions/recipes/getRecipes";
import { getLikedRecipes } from "@/lib/server-actions/recipes/getLikedRecipes";

export default async function RecipeSearchPage({
  searchParams,
}: {
  searchParams: Partial<RecipeSearchParams>;
}) {
  const blacklistedIngredients = await getBlacklistedIngredients();
  const recipes = await getRecipes({
    ...searchParams,
    blacklistedIngredientsIds: blacklistedIngredients?.map(
      (ingredient) => ingredient.id
    ),
  });
  const ingredients = await getIngredients();
  const user = (await getCurrentUser()) ?? undefined;
  const likedRecipes = await getLikedRecipes(user?.id || "");
  return (
    <RecipeSearchForm formData={searchParams} ingredients={ingredients}>
      {recipes.map((recipe) => (
        <RecipeListing
          key={recipe.id}
          recipe={recipe}
          isLiked={likedRecipes.some(
            (likedRecipe) => likedRecipe.recipeId === recipe.id
          )}
          user={user}
        />
      ))}
    </RecipeSearchForm>
  );
}
