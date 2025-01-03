import { getIngredients } from "@/app/api/ingredients/route";
import { getCurrentUser } from "@/app/api/users/current/route";
import { AddRecipePageClientView } from "@/components/organisms/client-rendered/recipes/AddRecipePageClientView";
import { redirect } from "next/navigation";

export const AddRecipePage = async () => {
  const user = await getCurrentUser();
  const ingredients = await getIngredients(0, 5000);

  if (!user) {
    return redirect("/login");
  }

  return <AddRecipePageClientView ingredients={ingredients} />;
};

export default AddRecipePage;
