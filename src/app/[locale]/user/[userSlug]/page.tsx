import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { getUserRecipes } from "@/lib/server-actions/recipes/getUserRecipes";
import { getUserPublicInfo } from "@/lib/server-actions/users/getUserPublicInfo";
import { UserHeaderServer } from "@/components/features/profile/UserHeaderServer";
import { RecipeCard } from "@/components/features/recipes/RecipeCard";
import { UserNotFound } from "@/components/molecules/info-display/UserNotFound";
import { Recipe } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { getUserOwnedCirclesById } from "@/lib/server-actions/recipes/getUserOwnedCirclesById";
import { getUserJoinedCircles } from "@/lib/server-actions/users/getUserJoinedCircles";
import { TextMedium } from "@/components/typography";

export default async function UserPage({
  params,
}: {
  params: { userSlug: string };
}) {
  const user = await getUserPublicInfo(params.userSlug);

  if (!user) {
    return <UserNotFound />;
  }

  const [recipes, userOwnedCircles, currentUserJoinedCircles] = await Promise.all([
    getUserRecipes({}, user.id),
    getUserOwnedCirclesById(user.id),
    getUserJoinedCircles(),
  ]);

  const joinedUserCirclesCount = currentUserJoinedCircles.filter((circle) =>
    userOwnedCircles.some((userCircle) => userCircle.id === circle.id)
  ).length;

  return (
    <PageContentLayout size="lg">
      <div className="flex flex-col w-full justify-start">
        <UserHeaderServer user={user}>
          {!!joinedUserCirclesCount && (
            <TextMedium className="text-muted-foreground">
              You are a member of {joinedUserCirclesCount} circles this user owns
            </TextMedium>
          )}
        </UserHeaderServer>
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
