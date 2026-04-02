import { getCurrentUser } from "@/app/api/users/current/route";
import { EmptyResultsIndicator } from "@/components/atoms/EmptyResultsIndicator";
import { RecipeCard } from "@/components/features/recipes/RecipeCard";
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {likedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} user={user} isLiked={true} />
        ))}
      </div>
      {!likedRecipes.length && (
        <EmptyResultsIndicator message="No liked recipes found" />
      )}
    </PageContentLayout>
  );
}
