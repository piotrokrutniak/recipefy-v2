import { TextH3 } from "../typography/TextH3";
import { RecipeListing } from "../features/recipes/RecipeListing";
import { LinkButton } from "../generic/LinkButton";
import { Recipe } from "@prisma/client";

export const LatestRecipesSection = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <section className="flex flex-col px-2 sm:px-5 py-4 gap-4 w-full">
      <div className="flex justify-between gap-2 sm:px-3">
        <TextH3 className="">Recently Added Recipes</TextH3>
        <LinkButton href={"/recipes"} variant={"outline"}>
          Find more
        </LinkButton>
      </div>
      {recipes.map((recipe) => (
        <RecipeListing
          key={recipe.id}
          recipe={recipe}
          isLiked={false}
          user={undefined}
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
