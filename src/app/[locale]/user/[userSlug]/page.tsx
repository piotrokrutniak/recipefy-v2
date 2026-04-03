export const revalidate = 3600;

import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { getUserRecipes } from "@/lib/server-actions/recipes/getUserRecipes";
import { getUserPublicInfo } from "@/lib/server-actions/users/getUserPublicInfo";
import { UserHeaderServer } from "@/components/features/profile/UserHeaderServer";
import { RecipeCard } from "@/components/features/recipes/RecipeCard";
import { UserNotFound } from "@/components/molecules/info-display/UserNotFound";
import { Recipe } from "@prisma/client";
import { Separator } from "@/components/ui/separator";

export default async function UserPage({
  params,
}: {
  params: { userSlug: string };
}) {
  const user = await getUserPublicInfo(params.userSlug);

  if (!user) {
    return <UserNotFound />;
  }

  const recipes = await getUserRecipes({}, user.id);

  return (
    <PageContentLayout size="lg">
      <div className="flex flex-col w-full justify-start">
        <UserHeaderServer user={user} />
        <Separator className="my-2" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {recipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} userSlug={user.slug ?? params.userSlug} />
        ))}
      </div>
    </PageContentLayout>
  );
}
