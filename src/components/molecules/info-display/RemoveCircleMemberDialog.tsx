"use client";

import { FaUserMinus } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { CircleMemberFullInfoDto } from "@/types/api";
import { useCallback, useState } from "react";
import { removeCircleMember } from "@/lib/server-actions/circles/removeCircleMember";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export const RemoveCircleMemberDialog = ({
  member,
}: {
  member: CircleMemberFullInfoDto;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const handleRemoveMember = useCallback(async () => {
    try {
      setIsLoading(true);
      await removeCircleMember(member.circleId, member.userId);
      toast({
        title: "Member removed",
        description: "The member has been removed from the circle",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while removing the member",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <FaUserMinus className="w-4 h-4 mr-2" />
          Remove
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Member</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to remove this member from the circle?
          <br />
          They will no longer be able to access the content exclusive to this
          circle.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleRemoveMember}
            disabled={isLoading}
          >
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
