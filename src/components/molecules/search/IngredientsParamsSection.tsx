import { OutlineContainer } from "@/components/atoms/OutlineContainer";
import { TextMedium } from "@/components/typography/TextMedium";
import { UseFormReturn } from "react-hook-form";
import { RecipeSearchFormData } from "@/hooks/forms/useSearchRecipesForm";
import { TextMuted } from "@/components/typography/TextMuted";
import { Ingredient } from "@prisma/client";
import { IngredientSearchCombobox } from "./IngredientSearchCombobox";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { EraserIcon } from "@radix-ui/react-icons";
import { Switch } from "@/components/ui/switch";
import { TextSmall } from "@/components/typography";

export const IngredientsParamsSection = ({
  form,
  ingredients,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<RecipeSearchFormData, any, undefined>;
  ingredients: Ingredient[];
}) => {
  const includeIngredient = (ingredient: Ingredient) => {
    if (form.getValues("ingredients").includes(ingredient.id)) {
      form.setValue(
        "ingredients",
        form.getValues("ingredients").filter((i) => i !== ingredient.id)
      );
    } else {
      form.setValue("ingredients", [
        ...form.getValues("ingredients"),
        ingredient.id,
      ]);
    }
  };

  const clearIngredients = () => {
    form.setValue("ingredients", []);
  };

  const selectedIngredients = form
    .watch("ingredients")
    .map((id) => ingredients.find((ingredient) => ingredient.id === id));

  const selectableIngredients = useMemo(() => {
    return ingredients.filter(
      (ingredient) => !selectedIngredients.includes(ingredient)
    );
  }, [ingredients, selectedIngredients]);

  return (
    <OutlineContainer className="flex flex-col gap-4 w-80">
      <div className="flex gap-1 items-center justify-between">
        <div className="flex flex-col gap-1">
          <TextMedium className="font-medium">Ingredients</TextMedium>
          <TextMuted>Recipe ingredients</TextMuted>
        </div>
        <Button size={"icon"} variant={"outline"} onClick={clearIngredients}>
          <EraserIcon />
        </Button>
      </div>
      {selectedIngredients.map((ingredient) => (
        <div key={ingredient?.id}>{ingredient?.name}</div>
      ))}
      <IngredientSearchCombobox
        ingredients={selectableIngredients}
        onIngredientClick={includeIngredient}
      />
      <BlacklistedIngredientsToggle form={form} />
    </OutlineContainer>
  );
};

const BlacklistedIngredientsToggle = ({
  form,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<RecipeSearchFormData, any, undefined>;
}) => {
  const includeBlacklistedRecipes = form.watch("includeBlacklistedRecipes");

  return (
    <div className="flex gap-1 items-start justify-between">
      <TextSmall className="font-medium">
        Include recipes with blacklisted ingredients
      </TextSmall>
      <Switch
        checked={includeBlacklistedRecipes}
        onCheckedChange={() =>
          form.setValue("includeBlacklistedRecipes", !includeBlacklistedRecipes)
        }
      />
    </div>
  );
};
