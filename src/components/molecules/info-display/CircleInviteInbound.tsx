import { CircleInviteFullInfoDto } from "@/types/api";
import { TextH4, TextP } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { OutlineContainer } from "@/components/atoms/OutlineContainer";

export const CircleInviteInbound = ({
  circleInvite,
}: {
  circleInvite: CircleInviteFullInfoDto;
}) => {
  return (
    <OutlineContainer className="flex gap-2">
      <div className="flex flex-col w-full">
        <TextH4>{circleInvite.circle?.name}</TextH4>
        <TextP noLeading>{`Invited by ${
          circleInvite.invitingUser?.name
        } on ${circleInvite.createdAt.toLocaleDateString()}`}</TextP>
      </div>
      <div className="flex gap-2 w-fit items-center">
        <Button>Accept</Button>
        <Button variant="destructive">Reject</Button>
      </div>
    </OutlineContainer>
  );
};
