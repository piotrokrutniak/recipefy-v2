import {
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Ingredient } from "@prisma/client";
import { useState } from "react";

export const IngredientSearchInput = ({
  setSearchQuery,
  ingredients,
  onIngredientClick,
}: {
  setSearchQuery: (query: string) => void;
  ingredients: Ingredient[];
  onIngredientClick: (ingredient: Ingredient) => void;
}) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Command shouldFilter>
      <CommandList>
        <CommandInput placeholder="Search ingredients..." />
        {ingredients?.map((ingredient) => (
          <CommandItem
            key={ingredient.id}
            onSelect={() => onIngredientClick(ingredient)}
          >
            {ingredient.name}
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
};
