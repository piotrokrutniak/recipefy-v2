"use client";

import { Circle } from "@prisma/client";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { deleteRecipe } from "@/lib/server-actions/recipes/deleteRecipe";
import { LinkButton } from "@/components/generic/LinkButton";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("recipes.detail");

  const handleDelete = async () => {
    let success;
    try {
      success = await deleteRecipe(recipe.id);
    } catch (error) {
      console.error(error);
      toast({
        title: t("deleteError"),
        description: t("deleteError"),
        variant: "destructive",
      });
      return;
    }

    if (success) {
      toast({
        title: t("deleteSuccess"),
        description: t("deleteSuccessDesc"),
      });
    } else {
      toast({
        title: t("deleteError"),
        description: t("deleteError"),
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
          href={`/recipes/${recipe.slug ?? recipe.id}/edit`}
          variant="default"
          size="default"
          className="w-full gap-2"
        >
          <FaEdit />
          {t("edit")}
        </LinkButton>
        <ActionConfirmationDialog
          title={t("deleteTitle")}
          description={t("deleteConfirm")}
          confirmButtonText={t("delete")}
          cancelButtonText={t("deleteCancel")}
          onConfirm={handleDelete}
          triggerButton={
            <Button
              variant="destructive"
              size="default"
              className="w-full gap-2"
            >
              <FaTrash />
              {t("delete")}
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
