import { TextMedium } from "@/components/typography/TextMedium";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RecipeSearchFormData } from "@/hooks/forms/useSearchRecipesForm";
import { UseFormReturn } from "react-hook-form";

type ParamInputProps = {
  label: string;
  placeholder: string;
  name: keyof RecipeSearchFormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  type?: "text" | "number" | "date";
  minValue?: number;
  maxValue?: number;
};

export const ParamInput = ({
  label,
  placeholder,
  name,
  form,
  type = "text",
  minValue,
  maxValue,
}: ParamInputProps) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <TextMedium>{label}</TextMedium>
      <FormField
        control={form.control}
        name={name as string}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type={type}
                placeholder={placeholder}
                className="resize-none"
                min={minValue}
                max={maxValue}
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
