"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RecipeSearchFormData } from "@/hooks/forms/useSearchRecipesForm";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";
import { FaLeaf, FaSeedling } from "react-icons/fa";

export const RecipeSearchContainer = ({
  form,
  onSubmit,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<RecipeSearchFormData, any, undefined>;
  onSubmit: (data: RecipeSearchFormData) => void;
}) => {
  const t = useTranslations("recipes.search");
  const tBadges = useTranslations("recipes.badges");
  const vegan = form.watch("vegan");
  const vegetarian = form.watch("vegetarian");

  const toggle = (field: "vegan" | "vegetarian") => {
    form.setValue(field, !form.getValues(field));
    form.handleSubmit(onSubmit)();
  };

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <Input {...form.register("query")} placeholder={t("placeholder")} />
        <Button type="submit">{t("button")}</Button>
      </form>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => toggle("vegan")}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border transition-colors",
            vegan
              ? "bg-green-100 border-green-500 text-green-700"
              : "border-input text-muted-foreground hover:border-green-400 hover:text-green-700"
          )}
        >
          <FaLeaf className="w-3 h-3" />
          {tBadges("vegan")}
        </button>
        <button
          type="button"
          onClick={() => toggle("vegetarian")}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border transition-colors",
            vegetarian
              ? "bg-green-100 border-green-500 text-green-700"
              : "border-input text-muted-foreground hover:border-green-400 hover:text-green-700"
          )}
        >
          <FaSeedling className="w-3 h-3" />
          {tBadges("vegetarian")}
        </button>
      </div>
    </div>
  );
};
