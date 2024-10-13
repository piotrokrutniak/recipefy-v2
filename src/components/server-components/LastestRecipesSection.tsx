import { SelectValue } from "@radix-ui/react-select";
import { RecipeListing } from "../features/recipes/RecipeListing";
import { TextH3 } from "../typography/TextH3";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "../ui/select";

export const LatestRecipesSection = () => {
  return (
    <section className="flex flex-col px-5 py-4 gap-4">
      <div className="flex justify-between">
        <TextH3 className="ml-5">Recently Added Recipes</TextH3>
        <RecipeTypeSelector />
      </div>
      <RecipeListing />
      <RecipeListing />
      <RecipeListing />
      <RecipeListing />
      <RecipeListing />
    </section>
  );
};

const RecipeTypeSelector = () => {
  return (
    <Select>
      <SelectTrigger className="w-44">
        <SelectValue placeholder="Select Recipe Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Meals</SelectLabel>
          <SelectItem value="breakfast">Breakfast</SelectItem>
          <SelectItem value="lunch">Lunch</SelectItem>
          <SelectItem value="dinner">Dinner</SelectItem>
          <SelectLabel>Diets</SelectLabel>
          <SelectItem value="vegetarian">Vegetarian</SelectItem>
          <SelectItem value="vegan">Vegan</SelectItem>
          <SelectItem value="keto">Keto</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
