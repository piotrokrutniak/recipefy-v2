import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TextH2 } from "../typography/TextH2";

export const Navbar = () => {
  return (
    <nav className="w-full p-3 flex h-fit justify-center fixed">
      <div className="max-w-7xl flex flex-1 justify-between">
      <TextH2>Recipefy</TextH2>
      <section className="flex relative gap-2">
        <NavbarButtons/>
        <Button variant={"outline"}>Sign In</Button>
        <Button>Sign Up</Button>
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
  )
};

const NavigationLinkButton = () => (
  <NavigationMenuItem>
    <Link href="/docs" legacyBehavior passHref>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        Recipes
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
);