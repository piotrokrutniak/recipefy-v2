import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { Recipe } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { FaClock, FaConciergeBell, FaLeaf, FaSeedling, FaUtensils } from "react-icons/fa";

export const RecipeCard = async ({
  recipe,
  userSlug,
}: {
  recipe: Recipe;
  userSlug?: string;
}) => {
  const t = await getTranslations("recipes.badges");
  const href = userSlug
    ? `/user/${userSlug}/recipes/${recipe.slug ?? recipe.id}`
    : `/recipes/${recipe.slug ?? recipe.id}`;

  return (
    <Link href={href} className="group">
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
            {recipe.vegan && (
              <Badge variant="outline" className="gap-1 font-normal text-xs">
                <FaLeaf className="w-2.5 h-2.5 text-green-600" />
                {t("vegan")}
              </Badge>
            )}
            {!recipe.vegan && recipe.vegetarian && (
              <Badge variant="outline" className="gap-1 font-normal text-xs">
                <FaSeedling className="w-2.5 h-2.5 text-green-500" />
                {t("vegetarian")}
              </Badge>
            )}
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
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
