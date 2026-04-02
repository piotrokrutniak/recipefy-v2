import { MarkupRenderer } from "@/components/molecules/markup/MarkdownRenderer";
import { TextH1 } from "@/components/typography/TextH1";
import { TextLead } from "@/components/typography/TextLead";
import { TextP } from "@/components/typography/TextP";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RecipeFullInfoDto } from "@/types/api";
import { MealType, User } from "@prisma/client";
import { Link } from "@/i18n/navigation";
import { AuthorControls } from "./AuthorControlsClient";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { FaLeaf, FaSeedling } from "react-icons/fa";

// TODO: Add mobile layout with foldable sections
export const RecipeViewBody = async ({
  recipe,
  user,
}: {
  recipe: RecipeFullInfoDto;
  user: User | null;
}) => {
  const t = await getTranslations("recipes.detail");
  const tBadges = await getTranslations("recipes.badges");
  const tMealTypes = await getTranslations("recipes.mealTypes");
  return (
    <div className="flex flex-col gap-3 w-full">
      <TextH1>{recipe.title}</TextH1>
      <Link
        href={`/user/${recipe.author?.slug ?? recipe.authorId}`}
        className="flex place-items-center w-fit gap-2"
      >
        <Avatar>
          <AvatarImage src={recipe.author?.image || ""} />
          <AvatarFallback>{recipe.author?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        {recipe.author?.name}
      </Link>
      <div className="flex flex-col">
        {!!recipe.prepTime && (
          <TextP noLeading>{`${t("prepTime")}: ${recipe.prepTime} ${t("minutes")}`}</TextP>
        )}
        {!!recipe.cookTime && (
          <TextP noLeading>{`${t("cookTime")}: ${recipe.cookTime} ${t("minutes")}`}</TextP>
        )}
      </div>
      <TextP noLeading>{`${recipe.description}`}</TextP>
      {(recipe.vegan || recipe.vegetarian || recipe.mealTypes.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {recipe.vegetarian && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border bg-green-100 border-green-500 text-green-700">
              <FaSeedling className="w-3 h-3" />
              {tBadges("vegetarian")}
            </span>
          )}
          {recipe.vegan && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border bg-green-100 border-green-500 text-green-700">
              <FaLeaf className="w-3 h-3" />
              {tBadges("vegan")}
            </span>
          )}
          {recipe.mealTypes.map((type) => (
            <span
              key={type}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm border bg-orange-100 border-orange-500 text-orange-700"
            >
              {tMealTypes(type)}
            </span>
          ))}
        </div>
      )}
      <MarkupRenderer content={recipe.content} />
    </div>
  );
};
