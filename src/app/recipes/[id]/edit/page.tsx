import { getRecipeById } from "@/app/api/recipes/[id]/route";
import { ClientContent } from "@/components/features/recipes/edit/EditRecipeClientView";
import { NotFoundError } from "@/components/organisms/errors/NotFoundError";
import { notFound } from "next/navigation";

const EditRecipePage = async ({ params }: { params: { id: string } }) => {
  const recipe = await getRecipeById(params.id);

  if (!recipe) {
    // TODO: Create a custom not found page
    // return notFound();
    return <NotFoundError />;
  }

  return <ClientContent recipe={recipe} />;
};

export default EditRecipePage;
