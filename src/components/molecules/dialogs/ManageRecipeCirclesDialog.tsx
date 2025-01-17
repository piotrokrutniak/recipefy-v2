import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { AssignCirclesToRecipeForm } from "@/components/organisms/forms/AssignCirclesToRecipeForm";
import { Circle } from "@prisma/client";

export const ManageRecipeCirclesDialog = ({
  recipeId,
  circleIds,
  circles,
}: {
  recipeId: string;
  circleIds: string[];
  circles: Circle[];
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Manage Recipe Access</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Recipe Access</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Manage the circles that this recipe is assigned to.
          <br />
          If the recipe availability is set to unlisted, it will only be visible
          to the circles you assign it to.
        </DialogDescription>
        <AssignCirclesToRecipeForm
          recipeId={recipeId}
          circleIds={circleIds}
          circles={circles}
        />
      </DialogContent>
    </Dialog>
  );
};
