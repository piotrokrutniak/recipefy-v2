"use client";

import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { PageContentSidebarLayout } from "@/components/layouts/PageContentSidebarLayout";
import { IngredientsParamsSection } from "@/components/molecules/search/IngredientsParamsSection";
import { PrepParamsSection } from "@/components/molecules/search/PrepParamsSection";
import { SearchContainer } from "@/components/molecules/search/SearchContainer";
import { Form } from "@/components/ui/form";
import {
  useSearchRecipesForm,
  RecipeSearchFormData,
} from "@/hooks/forms/useSearchRecipesForm";
import { useRouter } from "next/navigation";

export default function RecipeSearchForm({
  formData,
}: {
  formData: Partial<RecipeSearchFormData>;
}) {
  const form = useSearchRecipesForm(formData);
  const router = useRouter();

  const onSubmit = (data: RecipeSearchFormData) => {
    const params = Object.entries(data).map(([key, value]) =>
      !!value ? `${key}=${value}` : ""
    );
    console.log(`/recipes?${params.filter(Boolean).join("&")}`);

    router.replace(`/recipes?${params.filter(Boolean).join("&")}`);
  };

  return (
    <PageContentSidebarLayout>
      <Form {...form}>
        <PageContentLayout className="flex-grow-0 w-80">
          <PrepParamsSection form={form} />
          <IngredientsParamsSection form={form} />
        </PageContentLayout>
        <PageContentLayout>
          <div className="w-full">
            <SearchContainer onSubmit={onSubmit} form={form} />
          </div>
        </PageContentLayout>
      </Form>
    </PageContentSidebarLayout>
  );
}
