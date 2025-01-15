import { getCurrentUser } from "@/app/api/users/current/route";

import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { getUserRecipes } from "@/lib/server-actions/recipes/getUserRecipes";
import { getUserPublicInfo } from "@/lib/server-actions/users/getUserPublicInfo";
import { UserHeaderServer } from "@/components/features/profile/UserHeaderServer";
import { RecipeListing } from "@/components/features/recipes/RecipeListing";
import { getLikedRecipes } from "@/lib/server-actions/recipes/getLikedRecipes";
import { UserNotFound } from "@/components/molecules/info-display/UserNotFound";
import { Recipe, UserRecipeFavorite } from "@prisma/client";

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUserPublicInfo(params.id);

  if (!user) {
    return <UserNotFound />;
  }

  const currentUser = await getCurrentUser();

  const recipes = await getUserRecipes({}, params.id);
  const likedRecipes = await getLikedRecipes(currentUser?.id || "");

  return (
    <PageContentLayout size="lg" className="py-8">
      <UserHeaderServer user={user} />
      {recipes.map((recipe: Recipe) => (
        <RecipeListing
          key={recipe.id}
          recipe={recipe}
          user={currentUser}
          isLiked={likedRecipes.some(
            (likedRecipe: UserRecipeFavorite) =>
              likedRecipe.recipeId === recipe.id
          )}
        />
      ))}
    </PageContentLayout>
  );
}
