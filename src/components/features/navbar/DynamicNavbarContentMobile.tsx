"use client";

import { User } from "@prisma/client";
import { LinkButton } from "@/components/generic/LinkButton";
import { Separator } from "@/components/ui/separator";
import { FaSignOutAlt, FaUser, FaUserFriends } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { UserHeader } from "@/components/molecules/pop-ups/UserPanelPopUp";
import { FaPlus } from "react-icons/fa";
import { HeartIcon } from "@radix-ui/react-icons";
import { SheetClose } from "@/components/ui/sheet";

// TODO: Add auth buttons, add recipe and liked recipes to the navbar
export const DynamicNavbarContentMobile = ({ user }: { user?: User }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {user && <DynamicHeaderContentMobile user={user} />}
      {user ? (
        <>
          <SheetClose asChild>
            <LinkButton
              href={"/recipes/liked"}
              variant={"default"}
              className="max-sm:w-full"
            >
              <HeartIcon className="w-4 h-4 mr-1" />
              Liked Recipes
            </LinkButton>
          </SheetClose>
          <SheetClose asChild>
            <LinkButton
              href={"/recipes/add"}
              variant={"accent"}
              className="max-sm:w-full"
            >
              <FaPlus className="mr-1" />
              Add Recipe
            </LinkButton>
          </SheetClose>
          <SignOutButton />
        </>
      ) : (
        <>
          <LinkButton
            href={"/auth"}
            variant={"outline"}
            className="max-sm:w-full"
          >
            Sign In
          </LinkButton>
          <LinkButton href={"/auth"} className="max-sm:w-full">
            Sign Up
          </LinkButton>
        </>
      )}
    </div>
  );
};

export const DynamicHeaderContentMobile = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <UserHeader user={user} />
      <Separator className="my-2" />
      <SheetClose asChild>
        <LinkButton
          href={`/user/${user.id}`}
          variant={"default"}
          className="gap-2 h-12"
        >
          <FaUser className="w-4 h-4" />
          View your profile
        </LinkButton>
      </SheetClose>
      <SheetClose asChild>
        <LinkButton
          href={`/your-circles`}
          variant={"default"}
          className="gap-2 h-12"
        >
          <FaUserFriends className="w-4 h-4" />
          Your circles
        </LinkButton>
      </SheetClose>
    </div>
  );
};

export const SignOutButton = () => {
  return (
    <SheetClose asChild>
      <Button
        variant={"secondary"}
        onClick={() => signOut()}
        className="gap-2 mt-4 w-full h-12"
      >
        <FaSignOutAlt className="w-4 h-4" />
        Sign out
      </Button>
    </SheetClose>
  );
};
