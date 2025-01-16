import { CircleInviteFullInfoDto } from "@/types/api";
import { TextH3, TextP } from "@/components/typography";
import { Button } from "@/components/ui/button";

export const CircleInviteInbound = (circleInvite: CircleInviteFullInfoDto) => {
  return (
    <div className="flex gap-2">
      <div className="flex flex-col w-full">
        <TextH3>
          {circleInvite.invitee?.name || circleInvite.inviteeEmail}
        </TextH3>
        <TextP>{`${circleInvite.circle.createdAt.toLocaleDateString()}`}</TextP>
      </div>
      <div className="flex gap-2 w-fit">
        <Button>Accept</Button>
        <Button variant="destructive">Reject</Button>
      </div>
    </div>
  );
};
