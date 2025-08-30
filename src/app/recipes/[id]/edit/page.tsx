import { getIngredients } from "@/app/api/ingredients/route";
import { getCurrentUser } from "@/app/api/users/current/route";
import { ClientContent } from "@/components/features/recipes/edit/EditRecipeClientView";
import { getUserIngredients } from "@/lib/server-actions/ingredients/getUserIngredients";
import { getRecipeById } from "@/lib/server-actions/recipes/getRecipeById";
import { RecipeFullInfoDto } from "@/types/api";
import { redirect } from "next/navigation";

const EditRecipePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/auth");
  }

  const { id } = await params;
  const recipe = await getRecipeById(id);
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
