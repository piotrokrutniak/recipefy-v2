"use client";

import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { EditRecipeForm } from "@/components/organisms/forms/EditRecipeForm";
import { ClientProvidersWrapper } from "@/components/providers/ProvidersWrapper";
import { useToast } from "@/hooks/use-toast";
import { RecipeFullInfoDto } from "@/types/api";
import { Ingredient, Recipe, UserIngredient } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const ClientContent = ({
  recipe,
  verifiedIngredients,
  userIngredients,
}: {
  recipe: RecipeFullInfoDto;
  verifiedIngredients: Ingredient[];
  userIngredients: UserIngredient[];
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const handleSubmit = useCallback(
    (data: Recipe) => {
      toast({
        title: "Success",
        description: "Recipe updated successfully",
        variant: "default",
      });

      router.refresh();

      setTimeout(() => {
        router.push(`/recipes/${recipe.id}`);
      }, 1000);
    },
    // These dependencies are not needed for the callback to be memoized
    // Prevents unnecessary re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [recipe.id]
  );

  return (
    <ClientProvidersWrapper>
      <PageContentLayout className="p-4">
        <EditRecipeForm
          recipe={recipe}
          verifiedIngredients={verifiedIngredients}
          initialUserIngredients={userIngredients}
          onSubmitAction={handleSubmit}
        />
      </PageContentLayout>
    </ClientProvidersWrapper>
  );
};
