import { getRecipeById } from "@/app/api/recipes/[id]/route";
import { getCurrentUser } from "@/app/api/users/current/route";
import { RecipeViewBody } from "@/components/features/recipes/view/RecipeViewBody";
import { SideBarRecipeSummary } from "@/components/features/recipes/view/SideBarRecipeSummary";
import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { PageContentSidebarLayout } from "@/components/layouts/PageContentSidebarLayout";
import { NotFoundError } from "@/components/organisms/errors/NotFoundError";
import { RecipeFullInfoDto } from "@/types/api";

export const ViewRecipePage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const recipe = await getRecipeById(params.id);
  const user = await getCurrentUser();

  if (!recipe) {
    return <NotFoundError />;
  }

  return (
    <PageContentSidebarLayout>
      <PageContentLayout className="max-w-80">
        <SideBarRecipeSummary recipe={recipe as RecipeFullInfoDto} />
      </PageContentLayout>
      <PageContentLayout className="flex-1">
        <RecipeViewBody recipe={recipe} user={user} />
      </PageContentLayout>
    </PageContentSidebarLayout>
  );
};

export default ViewRecipePage;
