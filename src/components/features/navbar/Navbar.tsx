import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { TextH2 } from "../../typography/TextH2";
import { DynamicNavbarContent } from "./DynamicNavbarContent";

export const Navbar = () => {
  return (
    <nav className="w-full p-3 flex h-fit justify-center fixed backdrop-blur-lg z-40 bg-white bg-opacity-85">
      <div className="max-w-7xl flex flex-1 justify-between">
        <Link href="/" passHref>
          <TextH2>Recipefy</TextH2>
        </Link>
        <section className="flex relative gap-2 items-center">
          <NavbarButtons />
          <DynamicNavbarContent />
        </section>
      </div>
    </nav>
  );
};

const NavbarButtons = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationLinkButton />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const NavigationLinkButton = () => (
  <NavigationMenuItem>
    <Link href="/recipes" legacyBehavior passHref>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        Recipes
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
);
