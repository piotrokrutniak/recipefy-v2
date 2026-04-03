export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import RecipeSearchForm from "@/components/organisms/forms/SearchRecipesForm";

export const metadata: Metadata = {
  title: "Recipes | Saucy",
  description: "Browse and search recipes on Saucy",
};
import { RecipeSearchParams } from "@/app/api/recipes/route";
import { RecipeListing } from "@/components/features/recipes/RecipeListing";
import { getCurrentUser } from "@/app/api/users/current/route";
import { getIngredients } from "@/app/api/ingredients/route";
import { getBlacklistedIngredients } from "@/app/api/users/current/blacklisted-ingredients/route";
import { getPublicRecipes } from "@/lib/server-actions/recipes/getPublicRecipes";
import { getLikedRecipes } from "@/lib/server-actions/recipes/getLikedRecipes";

export default async function RecipeSearchPage({
  searchParams,
}: {
  searchParams: Partial<RecipeSearchParams>;
}) {
  const blacklistedIngredients = await getBlacklistedIngredients();
  const recipes = await getPublicRecipes({
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
