import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { PageContentSidebarLayout } from "@/components/layouts/PageContentSidebarLayout";
import { CircleInvites } from "@/components/molecules/info-display/CircleInvites";
import { CircleMembers } from "@/components/molecules/info-display/CircleMembers";
import { TextH2 } from "@/components/typography";
import { getCircleById } from "@/lib/server-actions/recipes/getCircleById";
import { CircleInviteStatus } from "@prisma/client";

export const CircleDetailsPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const circle = await getCircleById(params.id);

  if (!circle) {
    return <div>Circle not found</div>;
  }

  return (
    <PageContentSidebarLayout>
      <PageContentLayout className="flex w-[360px] max-w-[360px] py-8">
        <TextH2 className="w-full">{circle?.name}</TextH2>
        {/* <UserHeaderServer user={circle?.CircleOwner} /> */}
      </PageContentLayout>
      <PageContentLayout className="py-8">
        <CircleMembers members={circle?.members || []} />
        <CircleInvites
          circleId={params.id}
          circleInvites={
            circle?.circleInvite.filter(
              (invite) => invite.status === CircleInviteStatus.PENDING
            ) || []
          }
        />
      </PageContentLayout>
    </PageContentSidebarLayout>
  );
};

export default CircleDetailsPage;
