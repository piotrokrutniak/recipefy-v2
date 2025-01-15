import RecipeSearchForm from "@/components/organisms/forms/SearchRecipesForm";
import { getRecipes, RecipeSearchParams } from "../api/recipes/route";
import { RecipeListing } from "@/components/features/recipes/RecipeListing";
import { getCurrentUser } from "../api/users/current/route";
import { getLikedRecipes } from "../api/users/current/liked-recipes/route";
import { getIngredients } from "../api/ingredients/route";
import { getBlacklistedIngredients } from "../api/users/current/blacklisted-ingredients/route";

export default async function RecipeSearchPage({
  searchParams,
}: {
  searchParams: Partial<RecipeSearchParams>;
}) {
  console.log("searchParams", searchParams);
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
