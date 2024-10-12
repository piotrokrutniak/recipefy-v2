import { TextLarge } from "@/components/typography/TextLarge";
import { TextP } from "@/components/typography/TextP";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export const RecipeListing = () => {
  const rawData = {
    id: 1,
    title: "Recipe title",
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    imgUri:
      "https://recipefy-seven.vercel.app/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Frecipefy%2Fimage%2Fupload%2Fv1717061891%2Fcoscnrmevhcwub23xbqs.png&w=1920&q=75",
  };

  return (
    <div className="p-3 gap-3 flex">
      <Link href={`/recipes/${rawData.id}`}>
        <div className="relative w-48 aspect-square flex-shrink-0">
          <Image
            src={rawData.imgUri}
            alt={rawData.title}
            width={200}
            height={160}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </Link>
      <div className="p-2">
        <div className="flex justify-between items-center">
          <Link href={`/recipes/${rawData.id}`}>
            <TextLarge className="line-clamp-1">{rawData.title}</TextLarge>
          </Link>
          <Button className="w-10" variant={"ghost"}>
            <HeartIcon className="w-6 h-6 text-red-500 flex-shrink-0" />
          </Button>
        </div>
        <TextP className="line-clamp-4">{rawData.description}</TextP>
      </div>
    </div>
  );
};
