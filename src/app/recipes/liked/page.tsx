import { getCurrentUser } from "@/app/api/users/current/route";
import { RecipeListing } from "@/components/features/recipes/RecipeListing";
import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { TextH2 } from "@/components/typography";
import { getLikedRecipesFullInfos } from "@/lib/server-actions/recipes/getLikedRecipesFullInfos";

export default async function LikedRecipesPage() {
  const user = await getCurrentUser();
  const likedRecipes = await getLikedRecipesFullInfos(user?.id || "");

  if (!likedRecipes) {
    return <div>No liked recipes found</div>;
  }

  if (!user) {
    return <div>You must be logged in to view your liked recipes</div>;
  }

  return (
    <PageContentLayout size="lg" className="py-8">
      <TextH2>Your liked recipes</TextH2>
      {likedRecipes.map((recipe) => (
        <RecipeListing
          key={recipe.id}
          recipe={recipe}
          // isLiked={likedRecipes.some(
          //   (likedRecipe) => likedRecipe.recipeId === recipe.id
          // )}
          isLiked={true}
          user={user}
        />
      ))}
    </PageContentLayout>
  );
}
