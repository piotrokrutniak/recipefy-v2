import { OutlineContainer } from "@/components/atoms/OutlineContainer";
import { TextMedium } from "@/components/typography/TextMedium";
import { ParamInput } from "./ParamInput";
import { UseFormReturn } from "react-hook-form";
import { RecipeSearchFormData } from "@/components/organisms/forms/SearchRecipesForm";
import { TextMuted } from "@/components/typography/TextMuted";

export const IngredientsParamsSection = ({
  form,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<RecipeSearchFormData, any, undefined>;
}) => {
  return (
    <OutlineContainer className="flex flex-col gap-4 w-80">
      <div className="flex flex-col gap-1">
        <TextMedium className="font-medium">Ingredients</TextMedium>
        <TextMuted>Recipe ingredients</TextMuted>
      </div>
      {/* <ParamInput
        label="Cook Time"
        placeholder="Cook Time"
        name="cookTime"
        type="number"
        form={form}
      />
      <ParamInput
        label="Prep Time"
        placeholder="Prep Time"
        name="prepTime"
        type="number"
        form={form}
      /> */}
    </OutlineContainer>
  );
};
