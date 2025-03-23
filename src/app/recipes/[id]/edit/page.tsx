import { getIngredients } from "@/app/api/ingredients/route";
import { getCurrentUser } from "@/app/api/users/current/route";
import { ClientContent } from "@/components/features/recipes/edit/EditRecipeClientView";
import { getRecipeById } from "@/lib/server-actions/recipes/getRecipeById";
import { RecipeFullInfoDto } from "@/types/api";
import { redirect } from "next/navigation";

const EditRecipePage = async ({ params }: { params: { id: string } }) => {
  const recipe = await getRecipeById(params.id);
  const ingredients = await getIngredients();
  const user = await getCurrentUser();

  if (!recipe || recipe.authorId !== user?.id) {
    return redirect("/recipes");
  }

  return (
    <ClientContent
      verifiedIngredients={ingredients}
      recipe={recipe as RecipeFullInfoDto}
    />
  );
};

export default EditRecipePage;
