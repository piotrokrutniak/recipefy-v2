import { OutlineContainer } from "@/components/atoms/OutlineContainer";
import { TextMedium } from "@/components/typography/TextMedium";
import { ParamInput } from "./ParamInput";
import { UseFormReturn } from "react-hook-form";
import { TextMuted } from "@/components/typography/TextMuted";
import { RecipeSearchFormData } from "@/hooks/forms/useSearchRecipesForm";
import { cn } from "@/lib/utils";

export const PrepParamsSection = ({
  form,
  className,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<RecipeSearchFormData, any, undefined>;
  className?: string;
}) => {
  return (
    <OutlineContainer className={cn("flex flex-col gap-4 w-80", className)}>
      <div className="flex flex-col gap-1">
        <TextMedium className="font-medium">Preparation Time</TextMedium>
        <TextMuted>How much time do you have?</TextMuted>
      </div>
      <ParamInput
        label="Cook Time"
        placeholder="Cook Time (minutes)"
        name="cookTime"
        type="number"
        minValue={0}
        form={form}
      />
      <ParamInput
        label="Prep Time"
        placeholder="Prep Time (minutes)"
        name="prepTime"
        type="number"
        minValue={0}
        form={form}
      />
    </OutlineContainer>
  );
};
