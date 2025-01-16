// "use client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { LinkButton } from "../../generic/LinkButton";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { FaPlus, FaUserFriends } from "react-icons/fa";
import { HeartIcon } from "@radix-ui/react-icons";

export const DynamicNavbarContent = async () => {
  const session = await getServerSession(authOptions);

  return session?.user ? (
    <>
      <LinkButton href={"/profile/circles"} variant={"ghost"}>
        <FaUserFriends className="w-4 h-4 mr-1" />
        Your Circles
      </LinkButton>
      <LinkButton href={"/recipes/liked"} variant={"default"}>
        <HeartIcon className="w-4 h-4 mr-1" />
        Liked Recipes
      </LinkButton>
      <LinkButton href={"/recipes/add"} variant={"accent"}>
        <FaPlus className="mr-1" />
        Add Recipe
      </LinkButton>
      <LinkButton href={"/profile"} variant={"link"}>
        <Avatar>
          <AvatarImage
            src={session.user.image ?? undefined}
            referrerPolicy={"no-referrer"}
            alt={session.user.name ?? "avatar"}
          />
        </Avatar>
      </LinkButton>
    </>
  ) : (
    <>
      <LinkButton href={"/auth"} variant={"outline"}>
        Sign In
      </LinkButton>
      <LinkButton href={"/"}>Sign Up</LinkButton>
    </>
  );
};
