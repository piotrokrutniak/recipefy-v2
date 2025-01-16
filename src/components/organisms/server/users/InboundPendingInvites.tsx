import { CircleInvites } from "@/components/molecules/info-display/CircleInvites";
import { TextH3 } from "@/components/typography";

export const InboundPendingInvites = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <TextH3>Inbound Pending Invites</TextH3>
      <CircleInvites circleInvites={[]} />
    </div>
  );
};
