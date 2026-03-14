import { LinkButton } from "../../generic/LinkButton";
import { FaPlus } from "react-icons/fa";
import { HeartIcon } from "@radix-ui/react-icons";
import { UserPanelPopUp } from "@/components/molecules/pop-ups/UserPanelPopUp";
import { getCurrentUser } from "@/app/api/users/current/route";
import { getTranslations } from "next-intl/server";

export const DynamicNavbarContent = async () => {
  const user = await getCurrentUser();
  const t = await getTranslations("navigation");

  return user ? (
    <>
      <LinkButton href={"/recipes/liked"} variant={"default"}>
        <HeartIcon className="w-4 h-4 mr-2" />
        {t("likedRecipes")}
      </LinkButton>
      <LinkButton href={"/recipes/add"} variant={"accent"}>
        <FaPlus className="mr-2" />
        {t("addRecipe")}
      </LinkButton>
      <UserPanelPopUp user={user} />
    </>
  ) : (
    <>
      <LinkButton href={"/auth"} variant={"outline"}>
        {t("signIn")}
      </LinkButton>
      <LinkButton href={"/auth"}>{t("signUp")}</LinkButton>
    </>
  );
};
