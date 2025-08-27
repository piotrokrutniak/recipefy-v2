import { getCurrentUser } from "@/app/api/users/current/route";

import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { getUserRecipes } from "@/lib/server-actions/recipes/getUserRecipes";
import { getUserPublicInfo } from "@/lib/server-actions/users/getUserPublicInfo";
import { UserHeaderServer } from "@/components/features/profile/UserHeaderServer";
import { RecipeListing } from "@/components/features/recipes/RecipeListing";
import { getLikedRecipes } from "@/lib/server-actions/recipes/getLikedRecipes";
import { UserNotFound } from "@/components/molecules/info-display/UserNotFound";
import { Recipe, UserRecipeFavorite } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { getUserOwnedCirclesById } from "@/lib/server-actions/recipes/getUserOwnedCirclesById";
import { getUserJoinedCircles } from "@/lib/server-actions/users/getUserJoinedCircles";
import {
  TextLarge,
  TextLead,
  TextMedium,
  TextSmall,
} from "@/components/typography";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const user = await getUserPublicInfo(resolvedParams.id);

  if (!user) {
    return <UserNotFound />;
  }

  const currentUser = await getCurrentUser();

  const recipes = await getUserRecipes({}, resolvedParams.id);
  const likedRecipes = await getLikedRecipes(currentUser?.id || "");

  const userOwnedCircles = await getUserOwnedCirclesById(resolvedParams.id);
  const currentUserJoinedCircles = await getUserJoinedCircles();

  const joinedUserCirclesCount = currentUserJoinedCircles.filter((circle) =>
    userOwnedCircles.some((userCircle) => userCircle.id === circle.id)
  ).length;

  return (
    <PageContentLayout size="lg">
      <div className="flex flex-col w-full justify-start">
        <UserHeaderServer user={user}>
          {!!joinedUserCirclesCount && (
            <TextMedium className="text-muted-foreground">
              You are a member of {joinedUserCirclesCount} circles this user
              owns
            </TextMedium>
          )}
        </UserHeaderServer>

        <Separator className="my-2" />
      </div>
      {recipes.map((recipe: Recipe) => (
        <RecipeListing
          key={recipe.id}
          recipe={recipe}
          user={currentUser || undefined}
          isLiked={likedRecipes.some(
            (likedRecipe: UserRecipeFavorite) =>
              likedRecipe.recipeId === recipe.id
          )}
        />
      ))}
    </PageContentLayout>
  );
}
