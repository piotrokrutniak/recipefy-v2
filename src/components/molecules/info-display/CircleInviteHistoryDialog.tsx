import { TextH4, TextMedium } from "@/components/typography";
import { OutlineContainer } from "@/components/atoms/OutlineContainer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";
import { CircleInviteFullInfoDto } from "@/types/api";
import { FaHistory } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { CircleInviteStatus } from "@prisma/client";
import { useMemo } from "react";

export const CircleInviteHistoryDialog = async ({
  circleInvites,
}: {
  circleInvites: CircleInviteFullInfoDto[];
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="flex gap-2">
          <FaHistory className="mr-2 w-4 h-4" />
          Invite History
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite History</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          View the history of invites to your circle.
        </DialogDescription>
        <div className="relative flex flex-col gap-4">
          {circleInvites.map((circleInvite) => (
            <CircleInviteHistoryEntry
              key={circleInvite.id}
              circleInvite={circleInvite}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const CircleInviteHistoryEntry = ({
  circleInvite,
}: {
  circleInvite: CircleInviteFullInfoDto;
}) => {
  const statusColor = useMemo(() => {
    switch (circleInvite.status) {
      case CircleInviteStatus.ACCEPTED:
        return "bg-green-500";
      case CircleInviteStatus.REJECTED:
        return "bg-red-500";
      default:
        return "bg-black";
    }
  }, [circleInvite.status]);

  return (
    <OutlineContainer className="flex gap-2 justify-between items-center w-full flex-wrap">
      <div className="flex flex-col w-full justify-between">
        <TextH4>{circleInvite.circle?.name}</TextH4>
        <TextMedium className="line-clamp-2">
          {`Invited ${
            circleInvite.inviteeEmail
          } on ${circleInvite.createdAt.toLocaleDateString()}`}
        </TextMedium>
      </div>
      <TextMedium
        className={cn(statusColor, "text-white px-2 py-1 rounded-md")}
      >
        {circleInvite.status}
      </TextMedium>
    </OutlineContainer>
  );
};
