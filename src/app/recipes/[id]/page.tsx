import { getRecipeNote } from "@/app/api/recipes/[id]/add-note/route";
import { getCurrentUser } from "@/app/api/users/current/route";
import { RecipeViewBody } from "@/components/features/recipes/view/RecipeViewBody";
import { SideBarRecipeSummary } from "@/components/features/recipes/view/SideBarRecipeSummary";
import { LinkButton } from "@/components/generic/LinkButton";
import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { PageContentSidebarLayout } from "@/components/layouts/PageContentSidebarLayout";
import { ForbiddenError } from "@/components/organisms/errors/ForbiddenError";
import { NotFoundError } from "@/components/organisms/errors/NotFoundError";
import { getRecipeById } from "@/lib/server-actions/recipes/getRecipeById";
import { getUserJoinedCircles } from "@/lib/server-actions/users/getUserJoinedCircles";
import { RecipeFullInfoDto } from "@/types/api";
import { Visibility } from "@prisma/client";
import { notFound } from "next/navigation";

export const ViewRecipePage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const recipe = await getRecipeById(params.id);
  const user = await getCurrentUser();
  const userCircles = await getUserJoinedCircles();
  const recipeNote = await getRecipeNote(params.id);

  if (!recipe) {
    return <NotFoundError />;
  }

  if (
    user?.id !== recipe.authorId &&
    recipe.visibility === Visibility.PRIVATE
  ) {
    return <ForbiddenCircleError />;
  }

  if (
    user?.id !== recipe.authorId &&
    recipe.visibility === Visibility.UNLISTED &&
    !userCircles.some((circle) =>
      recipe.circleRecipes.some((cr) => cr.circleId === circle.id)
    )
  ) {
    return <ForbiddenCircleError />;
  }

  return (
    <PageContentSidebarLayout>
      <PageContentLayout className="max-w-80">
        <SideBarRecipeSummary
          recipe={recipe as RecipeFullInfoDto}
          initialNote={recipeNote?.note}
        />
      </PageContentLayout>
      <PageContentLayout className="flex-1">
        <RecipeViewBody recipe={recipe as RecipeFullInfoDto} user={user} />
      </PageContentLayout>
    </PageContentSidebarLayout>
  );
};

export default ViewRecipePage;

const ForbiddenCircleError = () => (
  <ForbiddenError>
    <LinkButton href="/your-circles" className="mt-4">
      Go back to your circles
    </LinkButton>
  </ForbiddenError>
);
