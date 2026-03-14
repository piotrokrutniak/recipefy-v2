import { getRecipeNote } from "@/app/api/recipes/[id]/add-note/route";
import { getCurrentUser } from "@/app/api/users/current/route";
import type { Metadata } from "next";
import { RecipeViewBody } from "@/components/features/recipes/view/RecipeViewBody";
import { SideBarRecipeSummary } from "@/components/features/recipes/view/SideBarRecipeSummary";
import { LinkButton } from "@/components/generic/LinkButton";
import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { PageContentSidebarLayout } from "@/components/layouts/PageContentSidebarLayout";
import { ForbiddenError } from "@/components/organisms/errors/ForbiddenError";
import { NotFoundError } from "@/components/organisms/errors/NotFoundError";
import { getRecipeBySlug } from "@/lib/server-actions/recipes/getRecipeById";
import { getUserJoinedCircles } from "@/lib/server-actions/users/getUserJoinedCircles";
import DBClient from "@/persistence/DBClient";
import { RecipeFullInfoDto } from "@/types/api";
import { User, Visibility } from "@prisma/client";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const recipe = await getRecipeBySlug(params.slug);

  if (!recipe) {
    return { title: "Recipe not found" };
  }

  const images = recipe.thumbnailUrl
    ? [{ url: recipe.thumbnailUrl, width: 1200, height: 630, alt: recipe.title }]
    : [];

  return {
    title: recipe.title,
    description: recipe.description || undefined,
    openGraph: {
      title: recipe.title,
      description: recipe.description || undefined,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.title,
      description: recipe.description || undefined,
      images: recipe.thumbnailUrl ? [recipe.thumbnailUrl] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const prisma = DBClient.getInstance().prisma;
  const recipes = await prisma.recipe.findMany({
    where: { visibility: Visibility.PUBLIC, slug: { not: null } },
    select: { slug: true },
  });
  return recipes.map((r) => ({ slug: r.slug! }));
}

export const ViewRecipePage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const recipe = await getRecipeBySlug(params.slug);
  const user = await getCurrentUser();
  const userCircles = await getUserJoinedCircles();
  const recipeNote = recipe ? await getRecipeNote(recipe.id) : null;

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
    <PageContentSidebarLayout className="max-sm:flex-col max-sm:gap-4">
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
};

export default ViewRecipePage;

const ForbiddenCircleError = () => (
  <ForbiddenError>
    <LinkButton href="/your-circles" className="mt-4">
      Go back to your circles
    </LinkButton>
  </ForbiddenError>
);
