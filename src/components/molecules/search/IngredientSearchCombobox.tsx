import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ingredient, RecipeIngredient } from "@prisma/client";
import { useState } from "react";
import { IngredientSearchInput } from "./IngredientSearchContainer";

type IngredientSearchComboboxProps = {
  selectedIngredient?: RecipeIngredient;
  ingredients: Ingredient[];
  onIngredientClick: (ingredient: Ingredient) => void;
};
export const IngredientSearchCombobox = ({
  selectedIngredient,
  ingredients,
  onIngredientClick,
}: IngredientSearchComboboxProps) => {
  const [open, setOpen] = useState(false);

  const handleIngredientSelection = (ingredient: Ingredient) => {
    onIngredientClick(ingredient);
    // setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedIngredient?.id ? (
            <>
              {
                ingredients.find(
                  (ingredient) =>
                    ingredient.id === selectedIngredient.ingredientId ||
                    ingredient.id === selectedIngredient.userIngredientId
                )?.name
              }
            </>
          ) : (
            <>+ Select ingredient</>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <IngredientSearchInput
          setSearchQuery={() => {}}
          ingredients={ingredients}
          onIngredientClick={handleIngredientSelection}
        />
      </PopoverContent>
    </Popover>
  );
};
