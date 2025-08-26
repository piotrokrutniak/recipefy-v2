"use client";

import { RecipeSearchParams } from "@/app/api/recipes/route";
import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { PageContentSidebarLayout } from "@/components/layouts/PageContentSidebarLayout";
import { IngredientsParamsSection } from "@/components/molecules/search/IngredientsParamsSection";
import { PrepParamsSection } from "@/components/molecules/search/PrepParamsSection";
import { RecipeSearchContainer } from "@/components/molecules/search/RecipeSearchContainer";
import { TextP } from "@/components/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  useSearchRecipesForm,
  RecipeSearchFormData,
} from "@/hooks/forms/useSearchRecipesForm";
import { Ingredient } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function RecipeSearchForm({
  formData,
  children,
  ingredients,
}: {
  formData: Partial<RecipeSearchParams>;
  children?: React.ReactNode;
  ingredients: Ingredient[];
}) {
  const form = useSearchRecipesForm({
    ...formData,
    vegan: Boolean(formData.vegan),
    vegetarian: Boolean(formData.vegetarian),
    includeBlacklistedRecipes: Boolean(formData.includeBlacklistedRecipes),
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
        <PageContentLayout className="flex-grow-0 w-80 hidden md:block">
          <PrepParamsSection form={form} />
          <IngredientsParamsSection form={form} ingredients={ingredients} />
        </PageContentLayout>
        <PageContentLayout>
          <div className="w-full flex flex-col gap-4">
            <RecipeSearchContainer onSubmit={onSubmit} form={form} />
            <Accordion
              type="single"
              collapsible
              className="w-full px-3 md:hidden"
            >
              <AccordionItem value="search-parameters">
                <AccordionTrigger>Search parameters</AccordionTrigger>
                <AccordionContent>
                  <div className="md:hidden flex sm:flex-row flex-col gap-4">
                    <PrepParamsSection form={form} className="w-full" />
                    <IngredientsParamsSection
                      form={form}
                      ingredients={ingredients}
                      className="w-full"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {children}
          </div>
        </PageContentLayout>
      </Form>
    </PageContentSidebarLayout>
  );
}
