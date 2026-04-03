import { Link } from "@/i18n/navigation";
import Image from "next/image";
import saucyLogo from "@/assets/saucy-black.png";
import { DynamicNavbarContent } from "./DynamicNavbarContent";
import { LinkButton } from "@/components/generic/LinkButton";
import { getCurrentUser } from "@/app/api/users/current/route";
import { MobileNavbarSheet } from "./MobileNavbarSheet";
import { getTranslations } from "next-intl/server";

export const Navbar = async () => {
  const user = await getCurrentUser();
  const t = await getTranslations("navigation");

  return (
    <nav className="flex flex-1 justify-center p-3 sticky top-0 z-40">
      <div className="flex w-full max-w-7xl justify-between">
        <div className="absolute inset-0 bg-white/85 backdrop-blur-lg -z-10" />

        <Link href="/" passHref className="flex items-center">
          <Image src={saucyLogo} alt="Saucy" height={44} className="cursor-pointer" />
        </Link>
        <section className="flex relative gap-2 items-center max-sm:hidden">
          <LinkButton href="/recipes" variant="ghost">
            {t("recipes")}
          </LinkButton>
          <DynamicNavbarContent />
        </section>
        <section className="sm:hidden">
          <MobileNavbarSheet user={user ?? undefined} />
        </section>
      </div>
    </nav>
  );
};
