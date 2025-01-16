import { TextH3, TextP } from "@/components/typography";
import { CircleInviteOutbound } from "./CircleInviteOutbound";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { InviteUserToCircleForm } from "@/components/organisms/forms/InviteUserToCircleForm";
import { FaUserPlus } from "react-icons/fa";
import { CircleInviteHistoryDialog } from "./CircleInviteHistoryDialog";
import { CircleInviteFullInfoDto } from "@/types/api";
import { EmptyResultsIndicator } from "@/components/atoms/EmptyResultsIndicator";

export const CircleInvites = ({
  circleId,
  circleInvites,
}: {
  circleId: string;
  circleInvites: CircleInviteFullInfoDto[];
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-4 w-full justify-between mb-2">
        <TextH3>Pending Circle Invites</TextH3>
        <div className="flex gap-2">
          <CircleInviteHistoryDialog circleInvites={circleInvites} />
          <InviteUserToCircleDialog circleId={circleId} />
        </div>
      </div>
      {circleInvites.map((circleInvite) => (
        <CircleInviteOutbound
          key={circleInvite.id}
          circleInvite={circleInvite}
        />
      ))}
      {!circleInvites.length && (
        <EmptyResultsIndicator message="No pending invites" />
      )}
    </div>
  );
};

const InviteUserToCircleDialog = ({ circleId }: { circleId: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <FaUserPlus className="mr-2 w-4 h-4" />
          Invite
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite User to Circle</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Invite a user to join your circle.
        </DialogDescription>
        <InviteUserToCircleForm circleId={circleId} />
      </DialogContent>
    </Dialog>
  );
};
