import { getCurrentUser } from "@/app/api/users/current/route";
import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { PageContentSidebarLayout } from "@/components/layouts/PageContentSidebarLayout";
import { CircleInvites } from "@/components/molecules/info-display/CircleInvites";
import { CircleMembers } from "@/components/molecules/info-display/CircleMembers";
import { TextH2 } from "@/components/typography";
import { getCircleById } from "@/lib/server-actions/recipes/getCircleById";
import { redirect } from "next/navigation";

export const CircleDetailsPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const circle = await getCircleById(params.id);

  const currentUser = await getCurrentUser();

  if (!circle) {
    return <div>Circle not found</div>;
  }

  if (!currentUser) {
    return redirect("/auth");
  }

  if (currentUser.id !== circle.circleOwnerId) {
    return redirect("/profile");
  }

  return (
    <PageContentSidebarLayout>
      <PageContentLayout className="flex w-[360px] max-w-[360px] py-8">
        <TextH2 className="w-full">{circle?.name}</TextH2>
      </PageContentLayout>
      <PageContentLayout className="py-8">
        <CircleMembers members={circle?.circleMembers || []} />
        <CircleInvites
          circleId={params.id}
          circleInvites={circle?.circleInvite || []}
        />
      </PageContentLayout>
    </PageContentSidebarLayout>
  );
};

export default CircleDetailsPage;
