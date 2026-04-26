import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { HighlightedRecipesCarousel } from "@/components/server-components/HighlightedRecipesCarousel";
import { LatestRecipesSection } from "@/components/server-components/LatestRecipesSection";
import { getPublicRecipes } from "@/lib/server-actions/recipes/getPublicRecipes";

export const revalidate = 60;

const Home = async () => {
  const [carouselRecipes, latestRecipes] = await Promise.all([
    getPublicRecipes({ skip: 0, take: 3 }),
    getPublicRecipes({ skip: 0, take: 12 }),
  ]);

  return (
    <PageContentLayout className="pt-0">
      <HighlightedRecipesCarousel recipes={carouselRecipes} />
      <LatestRecipesSection recipes={latestRecipes} />
    </PageContentLayout>
  );
};

export default Home;
