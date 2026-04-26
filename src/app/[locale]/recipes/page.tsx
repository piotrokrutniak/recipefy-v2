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
import { getPublicRecipesCount } from "@/lib/server-actions/recipes/getPublicRecipesCount";
import { RecipesPagination } from "@/components/molecules/RecipesPagination";

export default async function RecipeSearchPage({
  searchParams,
}: {
  searchParams: Partial<RecipeSearchParams>;
}) {
  const blacklistedIngredients = await getBlacklistedIngredients();
  const queryParams = {
    ...searchParams,
    blacklistedIngredientsIds: blacklistedIngredients?.map((i) => i.id),
  };
  const [recipes, totalCount, ingredients, user] = await Promise.all([
    getPublicRecipes(queryParams),
    getPublicRecipesCount(queryParams),
    getIngredients(),
    getCurrentUser(),
  ]);
  return (
    <RecipeSearchForm formData={searchParams} ingredients={ingredients}>
      {recipes.map((recipe) => (
        <RecipeListing
          key={recipe.id}
          recipe={recipe}
          user={user ?? undefined}
        />
      ))}
      <RecipesPagination
        totalCount={totalCount}
        searchParams={searchParams as Record<string, string | string[] | undefined>}
      />
    </RecipeSearchForm>
  );
}
