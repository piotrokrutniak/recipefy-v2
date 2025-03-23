import Link from "next/link";
import { TextH2 } from "../../typography/TextH2";
import {
  DynamicNavbarContent,
  DynamicNavbarContentMobile,
} from "./DynamicNavbarContent";
import { LinkButton } from "@/components/generic/LinkButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="w-full p-3 flex h-fit justify-center fixed backdrop-blur-lg z-40 bg-white bg-opacity-85">
      <div className="max-w-7xl flex flex-1 justify-between">
        <Link href="/" passHref>
          <TextH2 className="cursor-pointer hover:text-light_red-500 transition-colors">
            Recipefy
          </TextH2>
        </Link>
        <section className="flex relative gap-2 items-center max-sm:hidden">
          <LinkButton href="/recipes" variant="ghost">
            Recipes
          </LinkButton>
          <DynamicNavbarContent />
        </section>
        <section className="sm:hidden">
          <Sheet modal={false}>
            <SheetTrigger>
              <Button variant="ghost" size="icon">
                <FaBars className="w-8 h-8" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full pt-12 sm:hidden flex flex-col gap-4 items-center">
              <DynamicNavbarContentMobile />
            </SheetContent>
          </Sheet>
        </section>
      </div>
    </nav>
  );
};
