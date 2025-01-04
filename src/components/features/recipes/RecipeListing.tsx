import { LikeButton } from "@/components/molecules/buttons/LikeButton";
import { TextLarge } from "@/components/typography/TextLarge";
import { TextP } from "@/components/typography/TextP";
import { Recipe, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export const RecipeListing = async ({
  user,
  recipe,
  isLiked,
}: {
  user?: User;
  recipe: Recipe;
  isLiked: boolean;
}) => {
  // const recipe = {
  //   id: 1,
  //   title: "Recipe title",
  //   description:
  //     "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
  //   imgUri:
  //     "https://recipefy-seven.vercel.app/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Frecipefy%2Fimage%2Fupload%2Fv1717061891%2Fcoscnrmevhcwub23xbqs.png&w=1920&q=75",
  // };

  return (
    <div className="p-3 gap-3 flex">
      <Link href={`/recipes/${recipe.id}`}>
        <div className="relative w-48 aspect-square flex-shrink-0 bg-slate-200 rounded-lg overflow-hidden">
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
          <Link href={`/recipes/${recipe.id}`}>
            <TextLarge className="line-clamp-1">{recipe.title}</TextLarge>
          </Link>
          {user && <LikeButton recipe={recipe} isLikedInitial={isLiked} />}
        </div>
        <TextP className="line-clamp-4" noLeading>
          {recipe.description}
        </TextP>
      </div>
    </div>
  );
};
