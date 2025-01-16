import { TextLarge, TextMedium } from "@/components/typography";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserPublicInfo } from "@/lib/server-actions/users/getUserPublicInfo";

export const UserHeaderServer = async ({ user }: { user: UserPublicInfo }) => {
  return (
    <div className="flex flex-col gap-3 items-center justify-between p-4 min-w-80">
      <Avatar className="w-[150px] h-[150px]">
        <AvatarImage
          src={user.image ?? undefined}
          referrerPolicy={"no-referrer"}
          alt={user.name ?? "avatar"}
        />
      </Avatar>
      <TextLarge>{user.name}</TextLarge>
      <div className="flex w-full flex-col gap-1">
        {user.bio && (
          <>
            <TextLarge>Bio</TextLarge>
            <TextMedium>{user.bio}</TextMedium>
          </>
        )}
      </div>
    </div>
  );
};
