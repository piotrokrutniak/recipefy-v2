import { TextLarge, TextP } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { CircleInvite } from "@prisma/client";

export const CircleInviteOutbound = ({
  circleInvite,
}: {
  circleInvite: CircleInvite;
}) => {
  return (
    <div className="flex gap-2">
      <div className="flex flex-col w-full justify-between">
        <TextLarge>{circleInvite.inviteeEmail}</TextLarge>
        <TextP
          noLeading
        >{`${circleInvite.createdAt.toLocaleDateString()}`}</TextP>
      </div>
      <div className="flex gap-2 w-fit items-center">
        <Button variant="outline">Cancel</Button>
      </div>
    </div>
  );
};
