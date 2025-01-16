import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { PageContentSidebarLayout } from "@/components/layouts/PageContentSidebarLayout";
import { TextH2 } from "@/components/typography";
import { getCircleById } from "@/lib/server-actions/recipes/getCircleById";

export const CircleDetailsPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const circle = await getCircleById(params.id);
  return (
    <PageContentSidebarLayout>
      <PageContentLayout className="flex w-[360px] max-w-[360px] py-8">
        <TextH2 className="w-full">{circle?.name}</TextH2>
      </PageContentLayout>
      <PageContentLayout></PageContentLayout>
    </PageContentSidebarLayout>
  );
};

export default CircleDetailsPage;
