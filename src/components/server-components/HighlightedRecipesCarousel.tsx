"use client";
import { useRef } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { TextH1 } from "../typography/TextH1";
import { TextLarge } from "../typography/TextLarge";
import Link from "next/link";

const rawData = {
  id: 1,
  title: "Recipe title",
  description:
    "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
  imgUri:
    "https://recipefy-seven.vercel.app/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Frecipefy%2Fimage%2Fupload%2Fv1717061891%2Fcoscnrmevhcwub23xbqs.png&w=1920&q=75",
};

type RecipeSlide = typeof rawData;

export const HighlightedRecipesCarousel = () => {
  

  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className="w-full h-screen-2/3 min-h-96 max-h-screen"
    >
      <CarouselContent>
        <Slide data={rawData} />
        <Slide data={rawData} />
        <Slide data={rawData} />
      </CarouselContent>
    </Carousel>
  );
};

const Slide = ({data}: {data: RecipeSlide}) => (
  <CarouselItem>
    <div className="relative w-full h-screen-2/3 bg-black">
      <Image
        src={data.imgUri}
        alt={data.title}
        width={1280}
        height={720}
        className="object-cover h-full w-full opacity-60"
      />
      <div className="absolute bottom-0 left-0 p-12 sm:w-2/3 lg:w-1/2 flex flex-col gap-4 text-white">
        <Link href={`/recipes/${data.id}`}>
          <TextH1>{data.title}</TextH1>
        </Link>
        <TextLarge className="flex line-clamp-4">{data.description}</TextLarge>
      </div>
    </div>
  </CarouselItem>
);