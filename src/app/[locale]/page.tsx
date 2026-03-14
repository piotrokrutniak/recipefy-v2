import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { HighlightedRecipesCarousel } from "@/components/server-components/HighlightedRecipesCarousel";
import { LatestRecipesSection } from "@/components/server-components/LatestRecipesSection";
import { getPublicRecipes } from "@/lib/server-actions/recipes/getPublicRecipes";

const Home = async () => {
  const recipes = await getPublicRecipes({
    skip: 0,
    take: 3,
  });

  return (
    <PageContentLayout className="pt-0">
      <HighlightedRecipesCarousel recipes={recipes} />
      <LatestRecipesSection />
    </PageContentLayout>
  );
};

export default Home;
