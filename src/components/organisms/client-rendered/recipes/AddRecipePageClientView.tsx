"use client";

import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { AddRecipeForm } from "@/components/organisms/forms/AddRecipeForm";
import { ClientProvidersWrapper } from "@/components/providers/ProvidersWrapper";
import { useToast } from "@/hooks/use-toast";
import { Ingredient, Recipe } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const AddRecipePageClientView = ({
  ingredients,
}: {
  ingredients: Ingredient[];
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = useCallback(
    (data: Recipe) => {
      toast({
        title: "Success",
        description: "Recipe created successfully",
        variant: "default",
      });

      setTimeout(() => {
        router.push(`/recipes/${data.id}`);
      }, 1000);
    },
    [toast, router]
  );

  return (
    <ClientProvidersWrapper>
      <PageContentLayout>
        <AddRecipeForm
          verifiedIngredients={ingredients}
          onSubmitAction={handleSubmit}
        />
      </PageContentLayout>
    </ClientProvidersWrapper>
  );
};
