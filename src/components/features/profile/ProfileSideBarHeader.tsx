import { getCurrentUser } from "@/app/api/users/current/route";
import { TextLarge } from "@/components/typography/TextLarge";
import { TextMedium } from "@/components/typography/TextMedium";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const ProfileSideBarHeader = async () => {
  const user = await getCurrentUser();

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
