"use client";

import { RecipeSearchParams } from "@/app/api/recipes/route";
import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { PageContentSidebarLayout } from "@/components/layouts/PageContentSidebarLayout";
import { IngredientsParamsSection } from "@/components/molecules/search/IngredientsParamsSection";
import { PrepParamsSection } from "@/components/molecules/search/PrepParamsSection";
import { RecipeSearchContainer } from "@/components/molecules/search/RecipeSearchContainer";
import { Form } from "@/components/ui/form";
import {
  useSearchRecipesForm,
  RecipeSearchFormData,
} from "@/hooks/forms/useSearchRecipesForm";
import { useRouter } from "next/navigation";

export default function RecipeSearchForm({
  formData,
  children,
}: {
  formData: Partial<RecipeSearchParams>;
  children?: React.ReactNode;
}) {
  const form = useSearchRecipesForm({
    ...formData,
    ingredients: formData.ingredients?.split(",") || [],
  });
  const router = useRouter();

  const onSubmit = (data: RecipeSearchFormData) => {
    const sanitizedData = {
      ...data,
      ingredients:
        data.ingredients.length > 0 ? data.ingredients.join(",") : null,
    };
    const params = Object.entries(sanitizedData).map(([key, value]) =>
      !!value ? `${key}=${value}` : ""
    );

    router.push(`/recipes?${params.filter(Boolean).join("&")}`);
  };

  return (
    <PageContentSidebarLayout>
      <Form {...form}>
        <PageContentLayout className="flex-grow-0 w-80">
          <PrepParamsSection form={form} />
          <IngredientsParamsSection form={form} />
        </PageContentLayout>
        <PageContentLayout>
          <div className="w-full flex flex-col gap-4">
            <RecipeSearchContainer onSubmit={onSubmit} form={form} />
            {children}
          </div>
        </PageContentLayout>
      </Form>
    </PageContentSidebarLayout>
  );
}
