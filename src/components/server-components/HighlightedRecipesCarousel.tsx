"use client";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { TextH1 } from "../typography/TextH1";
import { TextLarge } from "../typography/TextLarge";
import { LinkButton } from "../generic/LinkButton";
import { Recipe } from "@prisma/client";

const rawData = {
  id: 1,
  title: "Recipe title",
  description:
    "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
  imgUri:
    "https://recipefy-seven.vercel.app/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Frecipefy%2Fimage%2Fupload%2Fv1717061891%2Fcoscnrmevhcwub23xbqs.png&w=1920&q=75",
};

type RecipeSlide = typeof rawData;

export const HighlightedRecipesCarousel = ({
  recipes,
}: {
  recipes: Recipe[];
}) => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className="w-full h-screen-2/3 min-h-96 max-h-screen"
    >
      <CarouselContent>
        {recipes.map((recipe) => (
          <Slide data={recipe} key={recipe.id} />
        ))}
      </CarouselContent>
      <CarouselPrevious className="max-sm:hidden left-auto right-14 top-8" />
      <CarouselNext className="max-sm:hidden right-3 top-8" />
    </Carousel>
  );
};

const Slide = ({ data }: { data: Recipe }) => {
  const t = useTranslations("recipes.carousel");
  return (
    <CarouselItem>
      <div className="relative w-full h-screen-2/3 bg-black">
        <Image
          src={data.thumbnailUrl ?? ""}
          alt={data.title}
          width={1280}
          height={720}
          className="object-cover h-full w-full opacity-60"
        />
        <div className="absolute bottom-0 left-0 p-4 sm:p-12 sm:w-2/3 lg:w-1/2 flex flex-col gap-4 text-white">
          <TextH1>{data.title}</TextH1>
          <TextLarge className="flex line-clamp-4">
            {data.description}
          </TextLarge>
          <LinkButton
            href={`/recipes/${data.slug ?? data.id}`}
            variant="secondary"
            className="w-fit"
          >
            {t("viewRecipe")}
          </LinkButton>
        </div>
      </div>
    </CarouselItem>
  );
};
