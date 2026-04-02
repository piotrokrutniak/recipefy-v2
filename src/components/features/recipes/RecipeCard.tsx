import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RecipeBadgesOverflow } from "@/components/molecules/recipe/RecipeBadgesOverflow";
import { LikeButton } from "@/components/molecules/buttons/LikeButton";
import { Link } from "@/i18n/navigation";
import { Recipe, User } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { FaClock, FaConciergeBell, FaUtensils } from "react-icons/fa";

export const RecipeCard = async ({
  recipe,
  userSlug,
  user,
  isLiked,
}: {
  recipe: Recipe;
  userSlug?: string;
  user?: User | null;
  isLiked?: boolean;
}) => {
  const t = await getTranslations("recipes.badges");
  const tMealTypes = await getTranslations("recipes.mealTypes");
  const href = userSlug
    ? `/user/${userSlug}/recipes/${recipe.slug ?? recipe.id}`
    : `/recipes/${recipe.slug ?? recipe.id}`;

  return (
    <div className="relative group">
      <Link href={href}>
        <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
          <div className="relative aspect-square w-full bg-slate-200 overflow-hidden">
            {recipe.thumbnailUrl ? (
              <Image
                src={recipe.thumbnailUrl}
                alt={recipe.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-slate-200" />
            )}
          </div>
          <CardContent className="p-3 flex flex-col gap-2">
            <CardTitle className="text-sm leading-snug line-clamp-2">
              {recipe.title}
            </CardTitle>
            <div className="flex flex-wrap gap-1">
              {!!recipe.prepTime && (
                <Badge variant="outline" className="gap-1 font-normal text-xs">
                  <FaClock className="w-2.5 h-2.5" />
                  {recipe.prepTime} min
                </Badge>
              )}
              {!!recipe.cookTime && (
                <Badge variant="outline" className="gap-1 font-normal text-xs">
                  <FaUtensils className="w-2.5 h-2.5" />
                  {recipe.cookTime} min
                </Badge>
              )}
              {!!recipe.servings && (
                <Badge variant="outline" className="gap-1 font-normal text-xs">
                  <FaConciergeBell className="w-2.5 h-2.5" />
                  {recipe.servings}
                </Badge>
              )}
              <RecipeBadgesOverflow
                small
                badges={[
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
                ]}
              />
            </div>
          </CardContent>
        </Card>
      </Link>
      {user && (
        <div className="absolute top-2 right-2">
          <LikeButton recipe={recipe} isLikedInitial={isLiked ?? false} />
        </div>
      )}
    </div>
  );
};
