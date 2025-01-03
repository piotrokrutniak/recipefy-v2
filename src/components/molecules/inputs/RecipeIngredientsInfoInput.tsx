"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { Ingredient, RecipeIngredient } from "@prisma/client";
import { testIngredients } from "@/lib/test";
import { IngredientSearchCombobox } from "../search/IngredientSearchCombobox";

type RecipeIngredientsInfoInputProps = {
  recipeIngredients: (RecipeIngredient | undefined)[];
  addIngredient: (ingredient?: Ingredient) => void;
  updateIngredient: (ingredient: RecipeIngredient, index: number) => void;
  removeIngredient: (ingredientId: string) => void;
};

export const RecipeIngredientsInfoInput = ({
  recipeIngredients,
  addIngredient,
  updateIngredient,
  removeIngredient,
}: RecipeIngredientsInfoInputProps) => {
  // const allIngredients = await getIngredients();
  const allIngredients = testIngredients;

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
          ingredients={allIngredients}
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
  // const [searchQuery, setSearchQuery] = useState(selectedIngredient?.name);

  const handleIngredientClick = (ingredient: Ingredient) => {
    updateIngredient(
      {
        id: ingredient?.id ?? "",
        recipeId: selectedIngredient?.recipeId ?? "",
        ingredientId: ingredient.id,
        userIngredientId: null,
        amount: "",
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
      <Button
        variant="outline"
        size="icon"
        onClick={() => removeIngredient(selectedIngredient?.id ?? "")}
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
