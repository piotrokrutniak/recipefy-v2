"use client";
import { TextLarge } from "@/components/typography/TextLarge";
import { TextMedium } from "@/components/typography/TextMedium";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useQueryGetCurrentUser } from "@/hooks/api/users/queries/useQueryGetCurrentUser";
import { User } from "@prisma/client";

export const ProfileSideBarHeaderClient = ({ user }: { user: User }) => {
  const { data: currentUser = user } = useQueryGetCurrentUser();

  return (
    <div className="flex flex-col gap-3 items-center justify-between p-4 min-w-80">
      <Avatar className="w-[150px] h-[150px]">
        <AvatarImage
          src={currentUser.image ?? undefined}
          referrerPolicy={"no-referrer"}
          alt={currentUser.name ?? "avatar"}
        />
      </Avatar>
      <TextLarge>{currentUser.name}</TextLarge>
      <div className="flex w-full flex-col gap-1">
        {currentUser.bio && (
          <>
            <TextLarge>Bio</TextLarge>
            <TextMedium>{currentUser.bio}</TextMedium>
          </>
        )}
      </div>
    </div>
  );
};
