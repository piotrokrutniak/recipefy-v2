import { TextLarge, TextMedium } from "@/components/typography";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserPublicInfo } from "@/lib/server-actions/users/getUserPublicInfo";
import { FaBook, FaUsers, FaCalendar } from "react-icons/fa";

export const UserHeaderServer = ({
  user,
  recipesCount,
  circlesCount,
  children,
}: {
  user: UserPublicInfo;
  recipesCount?: number;
  circlesCount?: number;
  children?: React.ReactNode;
}) => {
  const memberSince = new Date(user.createdAt).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex max-sm:flex-col gap-6 justify-between p-4 min-w-80">
      <Avatar className="w-[150px] h-[150px] max-sm:mx-auto">
        <AvatarImage
          src={user.image ?? undefined}
          referrerPolicy={"no-referrer"}
          alt={user.name ?? "avatar"}
        />
      </Avatar>
      <div className="flex w-full flex-col gap-2 justify-end">
        <TextLarge>{user.name}</TextLarge>
        {user.bio && <TextMedium className="text-muted-foreground">{user.bio}</TextMedium>}
        <div className="flex flex-wrap gap-4 mt-1">
          {recipesCount !== undefined && (
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <FaBook className="w-3.5 h-3.5" />
              {recipesCount} {recipesCount === 1 ? "recipe" : "recipes"}
            </span>
          )}
          {circlesCount !== undefined && (
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <FaUsers className="w-3.5 h-3.5" />
              {circlesCount} {circlesCount === 1 ? "circle" : "circles"}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <FaCalendar className="w-3.5 h-3.5" />
            Member since {memberSince}
          </span>
        </div>
        {children}
      </div>
    </div>
  );
};
