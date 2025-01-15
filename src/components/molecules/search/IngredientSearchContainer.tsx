import {
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command } from "@/components/ui/command";
import { Ingredient } from "@prisma/client";

export const IngredientSearchInput = ({
  setSearchQuery,
  ingredients,
  onIngredientClick,
  className,
}: {
  setSearchQuery: (query: string) => void;
  ingredients: Ingredient[];
  onIngredientClick: (ingredient: Ingredient) => void;
  className?: string;
}) => {
  return (
    <Command shouldFilter>
      <CommandList>
        <CommandInput placeholder="Search ingredients..." />
        {ingredients?.map((ingredient) => (
          <CommandItem
            key={ingredient.id}
            onSelect={() => onIngredientClick(ingredient)}
            className={className}
          >
            {ingredient.name}
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
};
