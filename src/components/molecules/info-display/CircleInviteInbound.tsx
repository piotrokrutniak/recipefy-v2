"use client";

import { CircleInviteFullInfoDto } from "@/types/api";
import { TextH4, TextP } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { OutlineContainer } from "@/components/atoms/OutlineContainer";
import { acceptCircleInvite } from "@/lib/server-actions/circles/acceptCircleInvite";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useCallback } from "react";
import { rejectCircleInvite } from "@/lib/server-actions/circles/rejectCircleInvite";

export const CircleInviteInbound = ({
  circleInvite,
}: {
  circleInvite: CircleInviteFullInfoDto;
}) => {
  const { refresh } = useRouter();
  const { toast } = useToast();

  const handleAccept = useCallback(async () => {
    try {
      await acceptCircleInvite(circleInvite.id);
      refresh();
      toast({
        title: "Accepted circle invite",
        variant: "default",
      });
    } catch {
      toast({
        title: "Failed to accept circle invite",
        variant: "destructive",
      });
    }
  }, [circleInvite.id, refresh, toast]);

  const handleReject = useCallback(async () => {
    try {
      await rejectCircleInvite(circleInvite.id);
      refresh();
      toast({
        title: "Rejected circle invite",
        variant: "default",
      });
    } catch {
      toast({
        title: "Failed to reject circle invite",
        variant: "destructive",
      });
    }
  }, [circleInvite.id, refresh, toast]);

  return (
    <OutlineContainer className="flex gap-2">
      <div className="flex flex-col w-full">
        <TextH4>{circleInvite.circle?.name}</TextH4>
        <TextP noLeading>{`Invited by ${
          circleInvite.invitingUser?.name
        } on ${circleInvite.createdAt.toLocaleDateString()}`}</TextP>
      </div>
      <div className="flex gap-2 w-fit items-center">
        <Button variant="destructive" onClick={handleReject}>
          Reject
        </Button>
        <Button onClick={handleAccept}>Accept</Button>
      </div>
    </OutlineContainer>
  );
};
