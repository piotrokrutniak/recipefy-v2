import Link from "next/link";
import { TextH2 } from "../../typography/TextH2";
import { DynamicNavbarContent } from "./DynamicNavbarContent";
import { LinkButton } from "@/components/generic/LinkButton";
import { getCurrentUser } from "@/app/api/users/current/route";
import { MobileNavbarSheet } from "./MobileNavbarSheet";

export const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <nav className="flex flex-1 justify-between p-3 sticky top-0 z-40">
      <div className="absolute inset-0 bg-white/85 backdrop-blur-lg -z-10" />

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
        <MobileNavbarSheet user={user ?? undefined} />
      </section>
    </nav>
  );
};
