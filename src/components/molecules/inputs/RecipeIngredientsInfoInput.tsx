"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { Ingredient, RecipeIngredient } from "@prisma/client";
import { IngredientSearchCombobox } from "../search/IngredientSearchCombobox";
import { Input } from "@/components/ui/input";
import { SelectableIngredient } from "../search/IngredientSearchContainer";

type RecipeIngredientsInfoInputProps = {
  recipeIngredients: (RecipeIngredient | undefined)[];
  selectableIngredients: SelectableIngredient[];
  refreshIngredients: () => void;
  addIngredient: (ingredient?: Ingredient) => void;
  updateIngredient: (
    ingredient: Partial<RecipeIngredient>,
    index: number
  ) => void;
  removeIngredient: (ingredientId: string) => void;
};

export const RecipeIngredientsInfoInput = ({
  recipeIngredients,
  selectableIngredients,
  refreshIngredients,
  addIngredient,
  updateIngredient,
  removeIngredient,
}: RecipeIngredientsInfoInputProps) => {
  const lastIngredient = recipeIngredients[recipeIngredients.length - 1];

  const handleAddIngredient = (e: React.MouseEvent<HTMLButtonElement>) => {
    addIngredient({
      id: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      name: "",
      vegan: false,
      vegetarian: false,
    });
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {recipeIngredients.map((ingredient, index) => (
        <VerifiedIngredientItem
          key={ingredient?.id}
          index={index}
          selectedIngredient={ingredient}
          ingredients={selectableIngredients}
          updateIngredient={updateIngredient}
          removeIngredient={removeIngredient}
          refreshIngredients={refreshIngredients}
        />
      ))}

      {(!!lastIngredient?.id || !recipeIngredients.length) && (
        <Button variant="outline" size="icon" onClick={handleAddIngredient}>
          <PlusIcon className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

const VerifiedIngredientItem = ({
  index,
  selectedIngredient,
  ingredients,
  updateIngredient,
  removeIngredient,
  refreshIngredients,
}: {
  index: number;
  selectedIngredient?: RecipeIngredient;
  ingredients: SelectableIngredient[];
  updateIngredient: (ingredient: RecipeIngredient, index: number) => void;
  removeIngredient: (ingredientId: string) => void;
  refreshIngredients: () => void;
}) => {
  const handleIngredientClick = (ingredient: SelectableIngredient) => {
    updateIngredient(
      {
        id: ingredient?.id ?? "",
        recipeId: selectedIngredient?.recipeId ?? "",
        // If the object has a userId then we're dealing with a user ingredient
        ingredientId: ingredient.userId ? null : ingredient.id,
        userIngredientId: ingredient.userId ? ingredient.id : null,
        amount: selectedIngredient?.amount ?? "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      index
    );
  };

  const updateAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateIngredient(
      {
        id: selectedIngredient?.id ?? "",
        recipeId: selectedIngredient?.recipeId ?? "",
        ingredientId: selectedIngredient?.ingredientId ?? "",
        userIngredientId: selectedIngredient?.userIngredientId ?? "",
        amount: e.target.value,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      index
    );
  };

  return (
    <div className="flex flex-row gap-2 w-full">
      <IngredientSearchCombobox
        selectedIngredient={selectedIngredient}
        ingredients={ingredients}
        onIngredientClick={handleIngredientClick}
        refreshIngredients={refreshIngredients}
        buttonClassName="min-w-40"
      />
      <Input value={selectedIngredient?.amount} onChange={updateAmount} />
      <Button
        variant="outline"
        size="icon"
        onClick={() => removeIngredient(selectedIngredient?.id ?? "")}
        className="aspect-square"
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
