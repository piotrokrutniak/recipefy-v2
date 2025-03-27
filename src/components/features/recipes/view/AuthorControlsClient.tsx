"use client";

import { Circle } from "@prisma/client";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { deleteRecipe } from "@/lib/server-actions/recipes/deleteRecipe";
import { LinkButton } from "@/components/generic/LinkButton";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ManageRecipeCirclesDialog } from "@/components/molecules/dialogs/ManageRecipeCirclesDialog";
import { RecipeFullInfoDto } from "@/types/api";
import { RecipeAvailabilitySelect } from "@/components/molecules/selects/RecipeAvailabilitySelect";
import { ActionConfirmationDialog } from "@/components/molecules/dialogs/ActionConfirmationDialog";

export const AuthorControls = ({
  recipe,
  circles,
}: {
  recipe: RecipeFullInfoDto;
  circles: Circle[];
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    let success;
    try {
      success = await deleteRecipe(recipe.id);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Error deleting recipe",
        variant: "destructive",
      });
      return;
    }

    if (success) {
      toast({
        title: "Recipe deleted",
        description: "Recipe successfully deleted",
      });
    } else {
      toast({
        title: "Error",
        description: "Error deleting recipe",
        variant: "destructive",
      });
      return;
    }
    router.push("/recipes");
  };

  return (
    <div className="flex flex-col gap-2">
      <RecipeAvailabilitySelect recipe={recipe} />
      <div className="flex flex-row gap-2 items-center">
        <LinkButton
          href={`/recipes/${recipe.id}/edit`}
          variant="default"
          size="default"
          className="w-full gap-2"
        >
          <FaEdit />
          Edit
        </LinkButton>
        <ActionConfirmationDialog
          title="Delete Recipe"
          description="Are you sure you want to delete this recipe?"
          confirmButtonText="Delete"
          cancelButtonText="Cancel"
          onConfirm={handleDelete}
          triggerButton={
            <Button
              variant="destructive"
              size="default"
              className="w-full gap-2"
            >
              <FaTrash />
              Delete
            </Button>
          }
        />
      </div>
      <ManageRecipeCirclesDialog
        recipeId={recipe.id}
        circleIds={recipe.circleRecipes.map((cr) => cr.circleId)}
        circles={circles}
      />
    </div>
  );
};
