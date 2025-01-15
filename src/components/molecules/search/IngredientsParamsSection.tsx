import { OutlineContainer } from "@/components/atoms/OutlineContainer";
import { TextMedium } from "@/components/typography/TextMedium";
import { UseFormReturn } from "react-hook-form";
import { RecipeSearchFormData } from "@/hooks/forms/useSearchRecipesForm";
import { TextMuted } from "@/components/typography/TextMuted";
import { Ingredient } from "@prisma/client";
import { IngredientSearchCombobox } from "./IngredientSearchCombobox";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Cross1Icon, EraserIcon } from "@radix-ui/react-icons";
import { Switch } from "@/components/ui/switch";
import { TextSmall } from "@/components/typography";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export const IngredientsParamsSection = ({
  form,
  ingredients,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<RecipeSearchFormData, any, undefined>;
  ingredients: Ingredient[];
}) => {
  const toggleIngredient = (ingredient: Ingredient) => {
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
        <div
          key={ingredient?.id}
          className="flex gap-1 items-center justify-between"
        >
          {ingredient?.name}
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => toggleIngredient(ingredient!)}
          >
            <Cross1Icon className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <IngredientSearchCombobox
        ingredients={selectableIngredients}
        onIngredientClick={toggleIngredient}
      />
      <Separator />
      <VeganVegetarianFilter form={form} />
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

const FilterCheckbox = ({
  name,
  label,
  checked,
  onChange,
}: {
  label: string;
  name: keyof RecipeSearchFormData;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => {
  return (
    <div className="flex gap-1 items-center">
      <Checkbox name={name} checked={checked} onCheckedChange={onChange} />
      <TextSmall className="font-medium">{label}</TextSmall>
    </div>
  );
};

const VeganVegetarianFilter = ({
  form,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<RecipeSearchFormData, any, undefined>;
}) => {
  const toggleVegan = (isVegan: boolean) => {
    const isVegetarian = form.getValues("vegetarian");

    if (isVegan && !isVegetarian) {
      form.setValue("vegetarian", true);
    }

    form.setValue("vegan", isVegan);
  };

  const toggleVegetarian = (isVegetarian: boolean) => {
    form.setValue("vegetarian", isVegetarian);
  };

  return (
    <div className="flex flex-col gap-2  w-full">
      <FilterCheckbox
        name="vegan"
        label="Vegan"
        checked={form.watch("vegan") as boolean}
        onChange={toggleVegan}
      />
      <FilterCheckbox
        name="vegetarian"
        label="Vegetarian"
        checked={form.watch("vegetarian") as boolean}
        onChange={toggleVegetarian}
      />
    </div>
  );
};
