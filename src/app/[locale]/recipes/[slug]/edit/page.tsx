import { getIngredients } from "@/app/api/ingredients/route";
import { getCurrentUser } from "@/app/api/users/current/route";
import { ClientContent } from "@/components/features/recipes/edit/EditRecipeClientView";
import { getUserIngredients } from "@/lib/server-actions/ingredients/getUserIngredients";
import { getRecipeBySlug } from "@/lib/server-actions/recipes/getRecipeById";
import { RecipeFullInfoDto } from "@/types/api";

import { redirect } from "@/i18n/server-navigation";

const EditRecipePage = async ({ params }: { params: { slug: string } }) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/auth");
  }

  const recipe = await getRecipeBySlug(params.slug);
  const ingredients = await getIngredients();
  const userIngredients = await getUserIngredients();

  if (!recipe || recipe.authorId !== user?.id) {
    return redirect("/recipes");
  }

  return (
    <ClientContent
      verifiedIngredients={ingredients}
      recipe={recipe as RecipeFullInfoDto}
      userIngredients={userIngredients}
    />
  );
};

export default EditRecipePage;
