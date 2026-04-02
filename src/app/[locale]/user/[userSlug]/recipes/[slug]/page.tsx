import { getRecipeNote } from "@/app/api/recipes/[id]/add-note/route";
import { getCurrentUser } from "@/app/api/users/current/route";
import { RecipeViewBody } from "@/components/features/recipes/view/RecipeViewBody";
import { SideBarRecipeSummary } from "@/components/features/recipes/view/SideBarRecipeSummary";
import { LinkButton } from "@/components/generic/LinkButton";
import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { PageContentSidebarLayout } from "@/components/layouts/PageContentSidebarLayout";
import { ForbiddenError } from "@/components/organisms/errors/ForbiddenError";
import { NotFoundError } from "@/components/organisms/errors/NotFoundError";
import { getUserPublicInfo } from "@/lib/server-actions/users/getUserPublicInfo";
import { getRecipeBySlug } from "@/lib/server-actions/recipes/getRecipeById";
import { getUserJoinedCircles } from "@/lib/server-actions/users/getUserJoinedCircles";
import { RecipeFullInfoDto } from "@/types/api";
import { User, Visibility } from "@prisma/client";
import { getTranslations } from "next-intl/server";

export default async function UserRecipePage({
  params,
}: {
  params: { userSlug: string; slug: string };
}) {
  const recipe = await getRecipeBySlug(params.slug);
  const user = await getCurrentUser();
  const profileUser = await getUserPublicInfo(params.userSlug);
  const userCircles = await getUserJoinedCircles();
  const recipeNote = recipe ? await getRecipeNote(recipe.id) : null;

  if (!recipe || !profileUser) {
    return <NotFoundError />;
  }

  if (user?.id !== recipe.authorId && recipe.visibility === Visibility.PRIVATE) {
    return <ForbiddenCircleError />;
  }

  if (
    user?.id !== recipe.authorId &&
    recipe.visibility === Visibility.UNLISTED &&
    !userCircles.some((circle) =>
      recipe.circleRecipes.some((cr) => cr.circleId === circle.id),
    )
  ) {
    return <ForbiddenCircleError />;
  }

  return (
    <PageContentSidebarLayout
      className="max-sm:flex-col max-sm:gap-4"
      breadcrumbs={[
        { label: profileUser.name ?? params.userSlug, href: `/user/${params.userSlug}` },
        { label: recipe.title },
      ]}
    >
      <PageContentLayout className="md:max-w-80">
        <SideBarRecipeSummary
          recipe={recipe as RecipeFullInfoDto}
          initialNote={recipeNote?.note}
          user={user as User}
        />
      </PageContentLayout>
      <PageContentLayout className="flex-1">
        <RecipeViewBody recipe={recipe as RecipeFullInfoDto} user={user} />
      </PageContentLayout>
    </PageContentSidebarLayout>
  );
}

const ForbiddenCircleError = async () => {
  const t = await getTranslations("recipes.detail");
  return (
    <ForbiddenError>
      <LinkButton href="/your-circles" className="mt-4">
        {t("backToCircles")}
      </LinkButton>
    </ForbiddenError>
  );
};
