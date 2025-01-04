import { OutlineContainer } from "@/components/atoms/OutlineContainer";
import { TextMedium } from "@/components/typography/TextMedium";
import { ParamInput } from "./ParamInput";
import { UseFormReturn } from "react-hook-form";
import { TextMuted } from "@/components/typography/TextMuted";
import { RecipeSearchFormData } from "@/hooks/forms/useSearchRecipesForm";

export const PrepParamsSection = ({
  form,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<RecipeSearchFormData, any, undefined>;
}) => {
  return (
    <OutlineContainer className="flex flex-col gap-4 w-80">
      <div className="flex flex-col gap-1">
        <TextMedium className="font-medium">Preparation Time</TextMedium>
        <TextMuted>Recipe timing parameters</TextMuted>
      </div>
      <ParamInput
        label="Cook Time"
        placeholder="Cook Time (minutes)"
        name="cookTime"
        type="number"
        form={form}
      />
      <ParamInput
        label="Prep Time"
        placeholder="Prep Time (minutes)"
        name="prepTime"
        type="number"
        form={form}
      />
    </OutlineContainer>
  );
};
