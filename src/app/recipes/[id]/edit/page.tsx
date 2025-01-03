import { getIngredients } from "@/app/api/ingredients/route";
import { getRecipeById } from "@/app/api/recipes/[id]/route";
import { ClientContent } from "@/components/features/recipes/edit/EditRecipeClientView";
import { NotFoundError } from "@/components/organisms/errors/NotFoundError";

const EditRecipePage = async ({ params }: { params: { id: string } }) => {
  const recipe = await getRecipeById(params.id);
  const ingredients = await getIngredients();

  if (!recipe) {
    // TODO: Create a custom not found page
    // return notFound();
    return <NotFoundError />;
  }

  return <ClientContent verifiedIngredients={ingredients} recipe={recipe} />;
};

export default EditRecipePage;
