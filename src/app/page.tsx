import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { HighlightedRecipesCarousel } from "@/components/server-components/HighlightedRecipesCarousel";
import { LatestRecipesSection } from "@/components/server-components/LastestRecipesSection";

export default function Home() {
  return (
    <PageContentLayout>
      <HighlightedRecipesCarousel />
      <LatestRecipesSection />
    </PageContentLayout>
  );
}
