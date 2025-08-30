import { SelectValue } from "@radix-ui/react-select";
import { TextH3 } from "../typography/TextH3";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "../ui/select";
import { RecipeListing } from "../features/recipes/RecipeListing";
import { getCurrentUser } from "@/app/api/users/current/route";
import { LinkButton } from "../generic/LinkButton";
import { getLikedRecipes } from "@/lib/server-actions/recipes/getLikedRecipes";
import { getPublicRecipes } from "@/lib/server-actions/recipes/getPublicRecipes";

export const LatestRecipesSection = async () => {
  const recipes = await getPublicRecipes({});
  const user = (await getCurrentUser()) ?? undefined;
  const likedRecipes = await getLikedRecipes(user?.id || "");
  return (
    <section className="flex flex-col sm:px-5 py-4 gap-4 w-full">
      <div className="flex justify-between gap-2 px-3">
        <TextH3 className="">Recently Added Recipes</TextH3>
        {/* TODO: Restore after incorporating filtering */}
        {/* <RecipeTypeSelector /> */}
      </div>
      {recipes.map((recipe) => (
        <RecipeListing
          key={recipe.id}
          recipe={recipe}
          isLiked={likedRecipes.some(
            (likedRecipe) => likedRecipe.recipeId === recipe.id
          )}
          user={user}
        />
      ))}
      <div className="px-3">
        <LinkButton href="/recipes" className="w-full">
          Discover more recipes
        </LinkButton>
      </div>
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
