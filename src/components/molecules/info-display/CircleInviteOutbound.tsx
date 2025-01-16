"use client";

import { OutlineContainer } from "@/components/atoms/OutlineContainer";
import { TextLarge, TextP } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cancelCircleInvite } from "@/lib/server-actions/circles/cancelCircleInvite";
import { CircleInvite } from "@prisma/client";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FaSpinner } from "react-icons/fa";

export const CircleInviteOutbound = ({
  circleInvite,
}: {
  circleInvite: CircleInvite;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleCancel = useCallback(async () => {
    try {
      setIsLoading(true);
      await cancelCircleInvite(circleInvite.id);
      toast({
        title: "Invite cancelled",
        description: "The invite has been cancelled",
        variant: "default",
      });
      setIsLoading(false);
      router.refresh();
    } catch {
      toast({
        title: "Error",
        description: "An error occurred while cancelling the invite",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }, [circleInvite.id, toast]);

  return (
    <OutlineContainer className="flex gap-2">
      <div className="flex flex-col w-full justify-between">
        <TextLarge>{circleInvite.inviteeEmail}</TextLarge>
        <TextP
          noLeading
        >{`${circleInvite.createdAt.toLocaleDateString()}`}</TextP>
      </div>
      <div className="flex gap-2 w-fit items-center">
        <Button
          disabled={isLoading}
          variant="outline"
          size="icon"
          onClick={handleCancel}
        >
          {isLoading ? (
            <FaSpinner className="w-4 h-4 animate-spin" />
          ) : (
            <Cross1Icon className="w-4 h-4" />
          )}
        </Button>
      </div>
    </OutlineContainer>
  );
};
