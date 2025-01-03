import { Recipe } from "@prisma/client";
import Image from "next/image";

export const RecipeThumbnail = ({ recipe }: { recipe?: Recipe }) => {
  return (
    <Image
      src={""}
      alt={recipe?.title ?? ""}
      className="w-full object-cover rounded-lg aspect-square bg-gunmetal-500"
    />
  );
};
