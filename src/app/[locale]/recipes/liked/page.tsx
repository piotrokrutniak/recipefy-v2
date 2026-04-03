import type { Metadata } from "next";
import { getCurrentUser } from "@/app/api/users/current/route";
import { EmptyResultsIndicator } from "@/components/atoms/EmptyResultsIndicator";
import { RecipeCard } from "@/components/features/recipes/RecipeCard";
import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { TextH2 } from "@/components/typography";
import { getLikedRecipesFullInfos } from "@/lib/server-actions/recipes/getLikedRecipesFullInfos";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Liked Recipes | Saucy",
  description: "Your liked recipes on Saucy",
};

export default async function LikedRecipesPage() {
  const t = await getTranslations("recipes.liked");
  const user = await getCurrentUser();
  const likedRecipes = await getLikedRecipesFullInfos(user?.id || "");

  if (!likedRecipes) {
    return <div>{t("empty")}</div>;
  }

  if (!user) {
    return <div>{t("notLoggedIn")}</div>;
  }

  return (
    <PageContentLayout size="lg" className="py-8">
      <TextH2>{t("title")}</TextH2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {likedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} user={user} isLiked={true} />
        ))}
      </div>
      {!likedRecipes.length && (
        <EmptyResultsIndicator message={t("empty")} />
      )}
    </PageContentLayout>
  );
}
