"use client";

import { Recipe } from "@prisma/client";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { deleteRecipe } from "@/lib/server-actions/recipes/deleteRecipe";
import { LinkButton } from "@/components/generic/LinkButton";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export const AuthorControls = ({ recipe }: { recipe: Recipe }) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    const success = await deleteRecipe(recipe.id);
    if (success) {
      toast({ title: "Recipe deleted", description: "Recipe deleted" });
    } else {
      toast({ title: "Error", description: "Error deleting recipe" });
      return;
    }

    router.push("/recipes");
  };

  return (
    <div className="flex flex-row gap-2 items-center">
      <LinkButton
        href={`/recipes/${recipe.id}/edit`}
        variant="default"
        size="default"
        className="w-fit gap-2"
      >
        <FaEdit />
        Edit
      </LinkButton>
      <Button
        variant="destructive"
        size="default"
        className="w-fit gap-2"
        onClick={handleDelete}
      >
        <FaTrash />
        Delete
      </Button>
    </div>
  );
};
