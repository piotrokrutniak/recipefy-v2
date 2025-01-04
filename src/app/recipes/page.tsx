import RecipeSearchForm from "@/components/organisms/forms/SearchRecipesForm";
import { getRecipes, RecipeSearchParams } from "../api/recipes/route";
import { RecipeListing } from "@/components/features/recipes/RecipeListing";
import { getCurrentUser } from "../api/users/current/route";
import { getLikedRecipes } from "../api/users/current/liked-recipes/route";

export default async function RecipeSearchPage({
  searchParams,
}: {
  searchParams: Partial<RecipeSearchParams>;
}) {
  const recipes = await getRecipes(searchParams);
  const user = (await getCurrentUser()) ?? undefined;
  const likedRecipes = await getLikedRecipes(user?.id || "");
  return (
    <RecipeSearchForm formData={searchParams}>
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
