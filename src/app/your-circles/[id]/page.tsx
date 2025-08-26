"use server";

import { getCurrentUser } from "@/app/api/users/current/route";
import { EmptyResultsIndicator } from "@/components/atoms/EmptyResultsIndicator";
import { RecipeListing } from "@/components/features/recipes/RecipeListing";
import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { ForbiddenError } from "@/components/organisms/errors/ForbiddenError";
import { NotFoundError } from "@/components/organisms/errors/NotFoundError";
import { TextH2 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { isForbiddenError, isNotFoundError } from "@/lib/errors";
import { getCircleRecipes } from "@/lib/server-actions/circles/getCircleRecipes";
import { getCircleById } from "@/lib/server-actions/recipes/getCircleById";
import { getLikedRecipes } from "@/lib/server-actions/recipes/getLikedRecipes";
import { CircleFullInfoDto } from "@/types/api";
import { redirect } from "next/navigation";
import { FaCog } from "react-icons/fa";

export const JoinedCirclePage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/auth");
  }

  let circle: CircleFullInfoDto | null = null;

  try {
    circle = await getCircleById(params.id);
  } catch (error) {
    if (isNotFoundError(error)) {
      return <NotFoundError />;
    }
    if (isForbiddenError(error)) {
      return <ForbiddenError />;
    }
    throw error;
  }

  const likedRecipes = await getLikedRecipes(user?.id);
  const circleRecipes = await getCircleRecipes(params.id);

  return (
    <PageContentLayout>
      <div className="flex flex-col gap-4 w-full px-3">
        <div className="flex justify-between">
          <TextH2> Recipes in {circle?.name}</TextH2>
          <Button>
            <FaCog className="mr-2" /> Manage circle
          </Button>
        </div>
        {circleRecipes.map((circleRecipe) => (
          <RecipeListing
            key={circleRecipe.recipe.id}
            recipe={circleRecipe.recipe}
            isLiked={likedRecipes.some(
              (likedRecipe) => likedRecipe.recipeId === circleRecipe.recipe.id
            )}
            user={user}
          />
        ))}
        {!circleRecipes.length && (
          <EmptyResultsIndicator message="No recipes in this circle yet" />
        )}
      </div>
    </PageContentLayout>
  );
};

export default JoinedCirclePage;
