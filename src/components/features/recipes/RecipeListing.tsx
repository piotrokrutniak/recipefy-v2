import { LikeButton } from "@/components/molecules/buttons/LikeButton";
import { RecipeBadgesOverflow, OverflowBadge } from "@/components/molecules/recipe/RecipeBadgesOverflow";
import { TextLarge } from "@/components/typography/TextLarge";
import { TextP } from "@/components/typography/TextP";
import { Badge } from "@/components/ui/badge";
import { Recipe, User } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { FaClock, FaConciergeBell, FaUtensils } from "react-icons/fa";
import { Link } from "@/i18n/navigation";

export const RecipeListing = async ({
  user,
  recipe,
}: {
  user?: User;
  recipe: Recipe;
}) => {
  const t = await getTranslations("recipes.badges");
  const tMealTypes = await getTranslations("recipes.mealTypes");

  const overflowBadges: OverflowBadge[] = [
    ...(recipe.vegetarian && !recipe.vegan
      ? [{ label: t("vegetarian"), color: "green" as const, icon: "seedling" as const }]
      : []),
    ...(recipe.vegan
      ? [{ label: t("vegan"), color: "green" as const, icon: "leaf" as const }]
      : []),
    ...recipe.mealTypes.map((type) => ({
      label: tMealTypes(type),
      color: "orange" as const,
    })),
  ];
  // const recipe = {
  //   id: 1,
  //   title: "Recipe title",
  //   description:
  //     "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
  //   imgUri:
  //     "https://recipefy-seven.vercel.app/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Frecipefy%2Fimage%2Fupload%2Fv1717061891%2Fcoscnrmevhcwub23xbqs.png&w=1920&q=75",
  // };

  return (
    <div className="py-3 gap-3 flex w-full max-sm:flex-col">
      <Link href={`/recipes/${recipe.slug ?? recipe.id}`}>
        <div className="relative sm:w-48 aspect-square flex-shrink-0 bg-slate-200 rounded-lg overflow-hidden">
          {recipe.thumbnailUrl && (
            <Image
              src={recipe.thumbnailUrl}
              alt={recipe.title}
              width={200}
              height={160}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </Link>
      <div className="p-2 w-full">
        <div className="flex justify-between items-center">
          <Link href={`/recipes/${recipe.slug ?? recipe.id}`}>
            <TextLarge className="line-clamp-2 sm:line-clamp-1">
              {recipe.title}
            </TextLarge>
          </Link>
          {user && <LikeButton recipe={recipe} />}
        </div>
        <TextP className="line-clamp-4 min-h-[6rem]" noLeading>
          {recipe.description}
        </TextP>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {!!recipe.prepTime && (
            <Badge variant="outline" className="gap-1 font-normal">
              <FaClock className="w-3 h-3" />
              {t("prepTime")}: {recipe.prepTime} min
            </Badge>
          )}
          {!!recipe.cookTime && (
            <Badge variant="outline" className="gap-1 font-normal">
              <FaUtensils className="w-3 h-3" />
              {t("cookTime")}: {recipe.cookTime} min
            </Badge>
          )}
          {!!recipe.servings && (
            <Badge variant="outline" className="gap-1 font-normal">
              <FaConciergeBell className="w-3 h-3" />
              {t("servings")}: {recipe.servings}
            </Badge>
          )}
          <RecipeBadgesOverflow badges={overflowBadges} />
        </div>
      </div>
    </div>
  );
};
