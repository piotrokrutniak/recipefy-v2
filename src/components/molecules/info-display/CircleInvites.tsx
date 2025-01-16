import { TextH3 } from "@/components/typography";
import { CircleInvite } from "@prisma/client";

export const CircleInvites = (circleInvites: CircleInvite[]) => {
  return (
    <div>
      <TextH3>Circle Invites</TextH3>
    </div>
  );
};
