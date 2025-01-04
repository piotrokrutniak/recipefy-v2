"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { Ingredient, RecipeIngredient } from "@prisma/client";
import { IngredientSearchCombobox } from "../search/IngredientSearchCombobox";
import { Input } from "@/components/ui/input";

type RecipeIngredientsInfoInputProps = {
  recipeIngredients: (RecipeIngredient | undefined)[];
  verifiedIngredients: Ingredient[];
  addIngredient: (ingredient?: Ingredient) => void;
  updateIngredient: (
    ingredient: Partial<RecipeIngredient>,
    index: number
  ) => void;
  removeIngredient: (ingredientId: string) => void;
};

export const RecipeIngredientsInfoInput = ({
  recipeIngredients,
  verifiedIngredients,
  addIngredient,
  updateIngredient,
  removeIngredient,
}: RecipeIngredientsInfoInputProps) => {
  useEffect(() => {
    console.log(recipeIngredients);
  }, [recipeIngredients]);

  const lastIngredient = recipeIngredients[recipeIngredients.length - 1];

  const handleAddIngredient = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("add ingredient");

    addIngredient({
      id: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      name: "",
      vegan: false,
      vegetarian: false,
    });
    e.preventDefault();
    // e.stopPropagation();
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {recipeIngredients.map((ingredient, index) => (
        <VerifiedIngredientItem
          key={ingredient?.id}
          index={index}
          selectedIngredient={ingredient}
          ingredients={verifiedIngredients}
          updateIngredient={updateIngredient}
          removeIngredient={removeIngredient}
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
}: {
  index: number;
  selectedIngredient?: RecipeIngredient;
  ingredients: Ingredient[];
  updateIngredient: (ingredient: RecipeIngredient, index: number) => void;
  removeIngredient: (ingredientId: string) => void;
}) => {
  const handleIngredientClick = (ingredient: Ingredient) => {
    updateIngredient(
      {
        id: ingredient?.id ?? "",
        recipeId: selectedIngredient?.recipeId ?? "",
        ingredientId: ingredient.id,
        userIngredientId: selectedIngredient?.userIngredientId ?? "",
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
