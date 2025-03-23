"use client";

import { User } from "@prisma/client";
import { LinkButton } from "@/components/generic/LinkButton";
import { Separator } from "@/components/ui/separator";
import { FaSignOutAlt, FaUser, FaUserFriends } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { UserHeader } from "@/components/molecules/pop-ups/UserPanelPopUp";

export const DynamicHeaderContentMobile = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <UserHeader user={user} />
      <Separator className="my-2" />
      <LinkButton
        href={`/user/${user.id}`}
        variant={"default"}
        className="gap-2"
      >
        <FaUser className="w-4 h-4" />
        View your profile
      </LinkButton>
      <LinkButton href={`/your-circles`} variant={"default"} className="gap-2">
        <FaUserFriends className="w-4 h-4" />
        Your circles
      </LinkButton>
      <Button variant={"secondary"} onClick={() => signOut()} className="gap-2">
        <FaSignOutAlt className="w-4 h-4" />
        Sign out
      </Button>
    </div>
  );
};
