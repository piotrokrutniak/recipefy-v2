import { RecipeSearchFormData } from "@/components/organisms/forms/SearchRecipesForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

export const SearchContainer = ({
  form,
  onSubmit,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<RecipeSearchFormData, any, undefined>;
  onSubmit: (data: RecipeSearchFormData) => void;
}) => {
  return (
    <div className="flex gap-2">
      <Input {...form.register("query")} placeholder="Search recipes" />
      <Button onClick={form.handleSubmit(onSubmit)}>Search</Button>
    </div>
  );
};
