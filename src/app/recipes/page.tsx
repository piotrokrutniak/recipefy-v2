import RecipeSearchForm from "@/components/organisms/forms/SearchRecipesForm";
import { RecipeSearchFormData } from "@/hooks/forms/useSearchRecipesForm";

export default async function RecipeSearchPage({
  searchParams,
}: {
  searchParams: Partial<RecipeSearchFormData>;
}) {
  return <RecipeSearchForm formData={searchParams} />;
}
