"use client";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ProfileSection } from "./ProfileSection";
import { SwitchRow } from "./SwitchRow";
import { TextLarge } from "@/components/typography/TextLarge";
import { useEffect, useState } from "react";
import { Ingredient } from "@prisma/client";
import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { useQueryGetIngredients } from "@/hooks/api/ingredients/queries/useQueryGetIngredients";
import { useMutationToggleBlacklistIngredient } from "@/hooks/api/users/mutations/useMutationToggleBlacklistIngredient";
import { useQueryGetBlacklistedIngredients } from "@/hooks/api/users/queries/useQueryGetBlacklistedIngredients";

export const RecipeSuggestionsSection = () => {
  return (
    <ProfileSection header="Recipe Suggestions">
      <div className="flex flex-col gap-4">
        <SwitchRow name="enableSuggestions" label="Enable Suggestions" />
        <SwitchRow name="vegetarianOnly" label="Display Vegetarian Only" />
        <SwitchRow name="veganOnly" label="Display Vegan Only" />
      </div>
      <BlacklistedIngredientsSection />
    </ProfileSection>
  );
};

const BlacklistedIngredientsSection = () => {
  const { data: initialBlacklistedIngredients } =
    useQueryGetBlacklistedIngredients();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: ingredients } = useQueryGetIngredients({ query: searchQuery });

  const { mutate: toggleIngredientBlacklist } =
    useMutationToggleBlacklistIngredient();

  const [blacklistedIngredients, setBlacklistedIngredients] = useState<
    Ingredient[]
  >([]);

  const handleIngredientClick = (ingredient: Ingredient) => {
    if (blacklistedIngredients.some((item) => item.id === ingredient.id)) {
      setBlacklistedIngredients(
        blacklistedIngredients.filter((item) => item.id !== ingredient.id)
      );
    } else {
      setBlacklistedIngredients([...blacklistedIngredients, ingredient]);
    }
    toggleIngredientBlacklist(ingredient);
  };

  useEffect(() => {
    setBlacklistedIngredients(initialBlacklistedIngredients ?? []);
  }, [initialBlacklistedIngredients]);

  if (!initialBlacklistedIngredients) {
    return null;
  }

  return (
    <>
      <TextLarge>Blacklisted Ingredients</TextLarge>
      <div className="flex flex-row flex-wrap gap-2 max-w-96">
        {blacklistedIngredients
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((ingredient) => (
            <BlacklistedIngredient
              key={ingredient.id}
              ingredient={ingredient}
            />
          ))}
      </div>
      <Command shouldFilter={false}>
        <CommandList>
          <CommandGroup>
            <CommandInput
              onValueChange={setSearchQuery}
              placeholder="Search ingredients..."
            />
            {ingredients?.map((ingredient) => (
              <CommandItem
                key={ingredient.id}
                className="gap-2"
                onSelect={() => handleIngredientClick(ingredient)}
              >
                {ingredient.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    blacklistedIngredients.some(
                      (item) => item.id === ingredient.id
                    )
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
};

const BlacklistedIngredient = ({ ingredient }: { ingredient: Ingredient }) => {
  return (
    <div className="py-1 px-2 rounded-md bg-slate-100">{ingredient.name}</div>
  );
};
