import { RecipeSearchFormData } from "@/components/organisms/forms/SearchRecipesForm";
import { TextMedium } from "@/components/typography/TextMedium";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

type ParamInputProps = {
  label: string;
  placeholder: string;
  name: keyof RecipeSearchFormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  type?: "text" | "number" | "date";
};

export const ParamInput = ({
  label,
  placeholder,
  name,
  form,
  type = "text",
}: ParamInputProps) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <TextMedium>{label}</TextMedium>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type={type}
                placeholder={placeholder}
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
