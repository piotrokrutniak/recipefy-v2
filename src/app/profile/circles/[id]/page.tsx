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
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const circle = await getCircleById(id);

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
    <PageContentSidebarLayout className="max-sm:flex-col max-sm:gap-4">
      <PageContentLayout className="flex w-[360px] max-w-[360px] py-8 max-sm:hidden">
        <TextH2 className="w-full">{circle?.name}</TextH2>
      </PageContentLayout>
      <TextH2 className="w-full sm:hidden">{circle?.name}</TextH2>
      <PageContentLayout className="py-8">
        <CircleMembers members={circle?.circleMembers || []} />
        <CircleInvites
          circleId={id}
          circleInvites={circle?.circleInvite || []}
        />
      </PageContentLayout>
    </PageContentSidebarLayout>
  );
};

export default CircleDetailsPage;
