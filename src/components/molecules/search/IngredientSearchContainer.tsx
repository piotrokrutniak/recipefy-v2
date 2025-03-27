import { Button } from "@/components/ui/button";
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command } from "@/components/ui/command";
import { Ingredient, UserIngredient } from "@prisma/client";
import clsx from "clsx";

export type CommonIngredient = Ingredient | UserIngredient;

export type SelectableIngredient = CommonIngredient & {
  userId?: string;
  userIngredientId?: string;
  ingredientId?: string;
};

export const IngredientSearchInput = ({
  setSearchQuery,
  ingredients,
  onIngredientClick,
  onNewIngredientClick,
  className,
}: {
  setSearchQuery: (query: string) => void;
  ingredients: SelectableIngredient[];
  onIngredientClick: (ingredient: SelectableIngredient) => void;
  onNewIngredientClick?: () => void;
  className?: string;
}) => {
  return (
    <Command shouldFilter>
      <CommandList>
        <CommandInput placeholder="Search ingredients..." />
        {onNewIngredientClick && (
          <Button
            variant="ghost"
            className="w-full rounded-none"
            onClick={onNewIngredientClick}
          >
            Create new ingredient
          </Button>
        )}
        <CommandEmpty>No results found.</CommandEmpty>
        {ingredients?.map((ingredient) => (
          <CommandItem
            key={ingredient.id}
            onSelect={() => onIngredientClick(ingredient)}
            className={className}
          >
            <span className={clsx(!!ingredient.userId && "text-blue-500")}>
              {ingredient.name}
            </span>
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
};
