import { ProfileSection } from "@/components/features/profile/ProfileSection";
import { getUserCircleInvites } from "@/lib/server-actions/recipes/getUserCircleInvites";
import { TextH2, TextMedium } from "@/components/typography";
import { CircleInviteInbound } from "./CircleInviteInbound";
import { CircleInviteFullInfoDto } from "@/types/api";

export const UserPendingCircleInvites = async () => {
  const circleInvites = await getUserCircleInvites();
  return (
    <ProfileSection>
      <TextH2>Pending Circle Invites</TextH2>
      <div className="flex flex-col gap-4 p-4">
        {circleInvites.map((circleInvite) => (
          <CircleInviteInbound
            key={circleInvite.id}
            circleInvite={circleInvite as CircleInviteFullInfoDto}
          />
        ))}
        {!circleInvites.length && (
          <TextMedium className="text-center py-8">
            No pending circle invites
          </TextMedium>
        )}
      </div>
    </ProfileSection>
  );
};
