import { TextH3 } from "../typography/TextH3";
import { RecipeListing } from "../features/recipes/RecipeListing";
import { LinkButton } from "../generic/LinkButton";
import { Recipe } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import { FaArrowRight } from "react-icons/fa";

export const LatestRecipesSection = async ({ recipes }: { recipes: Recipe[] }) => {
  const t = await getTranslations("landing");
  return (
    <section className="flex flex-col px-2 sm:px-5 py-4 gap-4 w-full">
      <div className="flex justify-between gap-2 sm:px-3">
        <TextH3 className="">{t("latestRecipes")}</TextH3>
        <LinkButton href={"/recipes"} variant={"outline"}>
          {t("viewAll")} <FaArrowRight className="ml-1 w-3 h-3" />
        </LinkButton>
      </div>
      {recipes.map((recipe) => (
        <RecipeListing
          key={recipe.id}
          recipe={recipe}
          user={undefined}
          showOverflowBadges={false}
        />
      ))}
      <div className="px-3">
        <LinkButton href="/recipes" className="w-full">
          {t("viewAll")} <FaArrowRight className="ml-1 w-3 h-3" />
        </LinkButton>
      </div>
    </section>
  );
};
