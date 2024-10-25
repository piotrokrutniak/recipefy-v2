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
import { useState } from "react";
import { Ingredient } from "@prisma/client";
import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

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
  const ingredients: Ingredient[] = [
    { name: "Peanuts", id: "1", createdAt: new Date(), updatedAt: new Date() },
    { name: "Dairy", id: "2", createdAt: new Date(), updatedAt: new Date() },
    { name: "Gluten", id: "3", createdAt: new Date(), updatedAt: new Date() },
    { name: "Soy", id: "4", createdAt: new Date(), updatedAt: new Date() },
    {
      name: "Shellfish",
      id: "5",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { name: "Eggs", id: "6", createdAt: new Date(), updatedAt: new Date() },
    { name: "Fish", id: "7", createdAt: new Date(), updatedAt: new Date() },
  ];

  const [blacklistedIngredients, setBlacklistedIngredients] = useState<
    Ingredient[]
  >([]);

  const handleIngredientClick = (ingredient: Ingredient) => {
    console.log(ingredient);
    if (blacklistedIngredients.some((item) => item.id === ingredient.id)) {
      setBlacklistedIngredients(
        blacklistedIngredients.filter((item) => item.id !== ingredient.id),
      );
    } else {
      setBlacklistedIngredients([...blacklistedIngredients, ingredient]);
    }
  };

  return (
    <>
      <TextLarge>Blacklisted Ingredients</TextLarge>
      <div className="flex flex-row flex-wrap gap-2 max-w-96">
        {blacklistedIngredients.map((ingredient) => (
          <BlacklistedIngredient key={ingredient.id} ingredient={ingredient} />
        ))}
      </div>
      <Command shouldFilter={false}>
        <CommandList>
          <CommandGroup>
            <CommandInput placeholder="Search ingredients..." />
            {ingredients.map((ingredient) => (
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
                      (item) => item.id === ingredient.id,
                    )
                      ? "opacity-100"
                      : "opacity-0",
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
