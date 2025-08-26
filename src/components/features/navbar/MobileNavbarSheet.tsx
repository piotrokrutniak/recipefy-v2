"use client";

import {
  DynamicHeaderContentMobile,
  SignOutButton,
} from "./DynamicNavbarContentMobile";
import { FaBars, FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sheet } from "@/components/ui/sheet";
import { User } from "@prisma/client";
import { LinkButton } from "@/components/generic/LinkButton";
import { HeartIcon } from "@radix-ui/react-icons";

export const MobileNavbarSheet = ({ user }: { user?: User }) => {
  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <FaBars className="w-8 h-8" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:hidden flex flex-col gap-4 items-center border-2 pt-16">
        {user && <DynamicHeaderContentMobile user={user} />}
        {user ? (
          <>
            <SheetClose asChild>
              <LinkButton
                href={"/recipes/liked"}
                variant={"default"}
                className="max-sm:w-full h-16"
              >
                <HeartIcon className="w-4 h-4 mr-1" />
                Liked Recipes
              </LinkButton>
            </SheetClose>
            <SheetClose asChild>
              <LinkButton
                href={"/recipes/add"}
                variant={"accent"}
                className="max-sm:w-full h-16"
              >
                <FaPlus className="mr-1" />
                Add Recipe
              </LinkButton>
            </SheetClose>
            <SignOutButton />
          </>
        ) : (
          <>
            <SheetClose asChild>
              <LinkButton
                href={"/auth"}
                variant={"outline"}
                className="max-sm:w-full h-16"
              >
                Sign In
              </LinkButton>
            </SheetClose>
            <SheetClose asChild>
              <LinkButton href={"/auth"} className="max-sm:w-full h-16">
                Sign Up
              </LinkButton>
            </SheetClose>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
