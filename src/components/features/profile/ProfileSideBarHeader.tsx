import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TextLarge } from "@/components/typography/TextLarge";
import { TextMedium } from "@/components/typography/TextMedium";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getServerSession } from "next-auth";

export const ProfileSideBarHeader = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col gap-3 items-center justify-between p-4 min-w-80">
      <Avatar className="w-[150px] h-[150px]">
        <AvatarImage
          src={session.user.image ?? undefined}
          referrerPolicy={"no-referrer"}
          alt={session.user.name ?? "avatar"}
        />
      </Avatar>
      <TextLarge>{session.user.name}</TextLarge>
      <div className="flex w-full flex-col gap-1">
        <TextLarge>Bio</TextLarge>
        <TextMedium noLeading>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </TextMedium>
      </div>
    </div>
  );
};
