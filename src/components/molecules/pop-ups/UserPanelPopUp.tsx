"use client";

import { AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TextLarge } from "@/components/typography/TextLarge";
import { User } from "@prisma/client";
import { TextSmall } from "@/components/typography/TextSmall";
import { LinkButton } from "@/components/generic/LinkButton";
import { Separator } from "@/components/ui/separator";
import { FaSignOutAlt, FaUser, FaUserFriends } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export const UserPanelPopUp = async ({ user }: { user: User }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={user.image ?? undefined} />
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-start">
        <UserHeader user={user} />
        <Separator className="my-2" />
        <LinkButton
          href={`/user/${user.id}`}
          variant={"link"}
          className="gap-2"
        >
          <FaUser className="w-4 h-4" />
          View your profile
        </LinkButton>
        <LinkButton href={`/your-circles`} variant={"link"} className="gap-2">
          <FaUserFriends className="w-4 h-4" />
          Your circles
        </LinkButton>
        <Button variant={"link"} onClick={() => signOut()} className="gap-2">
          <FaSignOutAlt className="w-4 h-4" />
          Sign out
        </Button>
      </PopoverContent>
    </Popover>
  );
};

const UserHeader = ({ user }: { user: User }) => {
  return (
    <div className="flex items-start gap-2">
      <Avatar>
        <AvatarImage src={user.image ?? undefined} />
      </Avatar>
      <div className="flex flex-col items-start">
        <TextLarge>{user.name}</TextLarge>
        <TextSmall>{user.email}</TextSmall>
        <LinkButton
          href={"/profile"}
          variant={"link"}
          className="px-0 text-indigo-500"
        >
          Manage your account
        </LinkButton>
      </div>
    </div>
  );
};
