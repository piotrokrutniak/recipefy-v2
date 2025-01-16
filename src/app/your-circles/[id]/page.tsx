"use server";

import { getCurrentUser } from "@/app/api/users/current/route";
import { RecipeListing } from "@/components/features/recipes/RecipeListing";
import { TextH2 } from "@/components/typography";
import { getCircleRecipes } from "@/lib/server-actions/circles/getCircleRecipes";
import { getCircleById } from "@/lib/server-actions/recipes/getCircleById";
import { getLikedRecipes } from "@/lib/server-actions/recipes/getLikedRecipes";
import { redirect } from "next/navigation";

export const JoinedCirclePage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/auth");
  }

  const circle = await getCircleById(params.id);

  if (!circle) {
    return redirect("/circles");
  }

  const likedRecipes = await getLikedRecipes(user?.id);
  const circleRecipes = await getCircleRecipes(params.id);

  return (
    <div className="flex flex-col gap-4">
      <TextH2> Recipes in {circle?.name}</TextH2>
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
    </div>
  );
};

export default JoinedCirclePage;
