import { TextLarge, TextMedium } from "@/components/typography";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserPublicInfo } from "@/lib/server-actions/users/getUserPublicInfo";

export const UserHeaderServer = async ({
  user,
  children,
}: {
  user: UserPublicInfo;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex max-sm:flex-col gap-4 justify-between p-4 min-w-80">
      <Avatar className="w-[150px] h-[150px] max-sm:mx-auto">
        <AvatarImage
          src={user.image ?? undefined}
          referrerPolicy={"no-referrer"}
          alt={user.name ?? "avatar"}
        />
      </Avatar>
      <div className="flex w-full flex-col gap-1 justify-end">
        <TextLarge>{user.name}</TextLarge>
        {user.bio && (
          <>
            <TextLarge>Bio</TextLarge>
            <TextMedium>{user.bio}</TextMedium>
          </>
        )}
        {children}
      </div>
    </div>
  );
};
