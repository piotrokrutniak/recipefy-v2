"use client";

import { OutlineContainer } from "@/components/atoms/OutlineContainer";
import { TextMedium } from "@/components/typography/TextMedium";
import { ParamInput } from "./ParamInput";
import { UseFormReturn } from "react-hook-form";
import { TextMuted } from "@/components/typography/TextMuted";
import { RecipeSearchFormData } from "@/hooks/forms/useSearchRecipesForm";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { EraserIcon } from "@radix-ui/react-icons";

export const PrepParamsSection = ({
  form,
  className,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<RecipeSearchFormData, any, undefined>;
  className?: string;
}) => {
  const t = useTranslations("recipes.search");

  const clearPrepParams = () => {
    form.setValue("cookTime", undefined);
    form.setValue("prepTime", undefined);
  };

  return (
    <OutlineContainer className={cn("flex flex-col gap-4 w-80", className)}>
      <div className="flex gap-1 items-center justify-between">
        <div className="flex flex-col gap-1">
          <TextMedium className="font-medium">{t("prepTimeTitle")}</TextMedium>
          <TextMuted>{t("prepTimeSubtitle")}</TextMuted>
        </div>
        <Button size={"icon"} variant={"outline"} onClick={clearPrepParams}>
          <EraserIcon />
        </Button>
      </div>
      <ParamInput
        label={t("cookTimeLabel")}
        placeholder={t("cookTimePlaceholder")}
        name="cookTime"
        form={form}
      />
      <ParamInput
        label={t("prepTimeLabel")}
        placeholder={t("prepTimePlaceholder")}
        name="prepTime"
        form={form}
      />
    </OutlineContainer>
  );
};
