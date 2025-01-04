"use client";

import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { EditRecipeForm } from "@/components/organisms/forms/EditRecipeForm";
import { ClientProvidersWrapper } from "@/components/providers/ProvidersWrapper";
import { useToast } from "@/hooks/use-toast";
import { RecipeFullInfoDto } from "@/types/api";
import { Ingredient, Recipe } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const ClientContent = ({
  recipe,
  verifiedIngredients,
}: {
  recipe: RecipeFullInfoDto;
  verifiedIngredients: Ingredient[];
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
    [toast, router, recipe]
  );

  return (
    <ClientProvidersWrapper>
      <PageContentLayout>
        <EditRecipeForm
          recipe={recipe}
          verifiedIngredients={verifiedIngredients}
          onSubmitAction={handleSubmit}
        />
      </PageContentLayout>
    </ClientProvidersWrapper>
  );
};
