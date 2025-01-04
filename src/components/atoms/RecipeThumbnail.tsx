import { Recipe } from "@prisma/client";
import Image from "next/image";

export const RecipeThumbnail = ({ recipe }: { recipe?: Recipe }) => {
  return (
    <Image
      src={recipe?.thumbnailUrl ?? ""}
      alt={recipe?.title ?? ""}
      width={320}
      height={320}
      className="w-full object-cover rounded-lg aspect-square bg-gunmetal-500"
    />
  );
};
