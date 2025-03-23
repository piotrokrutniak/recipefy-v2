import { LinkButton } from "../../generic/LinkButton";
import { FaPlus } from "react-icons/fa";
import { HeartIcon } from "@radix-ui/react-icons";
import { UserPanelPopUp } from "@/components/molecules/pop-ups/UserPanelPopUp";
import { getCurrentUser } from "@/app/api/users/current/route";
import { DynamicHeaderContentMobile } from "./DynamicNavbarContentMobile";

export const DynamicNavbarContent = async () => {
  const user = await getCurrentUser();

  return user ? (
    <>
      <LinkButton href={"/recipes/liked"} variant={"default"}>
        <HeartIcon className="w-4 h-4 mr-1" />
        Liked Recipes
      </LinkButton>
      <LinkButton href={"/recipes/add"} variant={"accent"}>
        <FaPlus className="mr-1" />
        Add Recipe
      </LinkButton>
      <UserPanelPopUp user={user} />
    </>
  ) : (
    <>
      <LinkButton href={"/auth"} variant={"outline"}>
        Sign In
      </LinkButton>
      <LinkButton href={"/auth"}>Sign Up</LinkButton>
    </>
  );
};

// TODO: Add auth buttons, add recipe and liked recipes to the navbar
export const DynamicNavbarContentMobile = async () => {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col gap-4 w-full">
      {user && <DynamicHeaderContentMobile user={user} />}
    </div>
  );
};
