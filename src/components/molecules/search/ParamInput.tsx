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
};

export const ParamInput = ({
  label,
  placeholder,
  name,
  form,
}: ParamInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name as string}
      render={({ field }) => (
        <FormItem>
          <TextMedium className="text-sm text-muted-foreground">{label}</TextMedium>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
