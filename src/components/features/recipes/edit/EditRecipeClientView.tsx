"use client";

import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { EditRecipeForm } from "@/components/organisms/forms/EditRecipeForm";
import { ClientProvidersWrapper } from "@/components/providers/ProvidersWrapper";
import { useToast } from "@/hooks/use-toast";
import { Recipe } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const ClientContent = ({ recipe }: { recipe: Recipe }) => {
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
        router.push(`/recipes/${data.id}`);
      }, 1000);
    },
    [toast, router]
  );

  return (
    <ClientProvidersWrapper>
      <PageContentLayout>
        <EditRecipeForm recipe={recipe} onSubmitAction={handleSubmit} />
      </PageContentLayout>
    </ClientProvidersWrapper>
  );
};
