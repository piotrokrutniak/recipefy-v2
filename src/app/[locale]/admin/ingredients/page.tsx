import { getIngredients } from "@/app/api/ingredients/route";
import { IngredientsManagerClient } from "@/components/features/admin/ingredients/IngredientsManagerClient";

export default async function IngredientsAdminPage() {
  const ingredients = await getIngredients(0, 500);

  return <IngredientsManagerClient initialIngredients={ingredients} />;
}
