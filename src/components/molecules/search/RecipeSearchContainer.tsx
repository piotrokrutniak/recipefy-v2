import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RecipeSearchFormData } from "@/hooks/forms/useSearchRecipesForm";
import { UseFormReturn } from "react-hook-form";

export const RecipeSearchContainer = ({
  form,
  onSubmit,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<RecipeSearchFormData, any, undefined>;
  onSubmit: (data: RecipeSearchFormData) => void;
}) => {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
      <Input {...form.register("query")} placeholder="Search recipes" />
      <Button type="submit">Search</Button>
    </form>
  );
};
