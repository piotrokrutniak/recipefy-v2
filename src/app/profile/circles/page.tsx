import { getCurrentUser } from "@/app/api/users/current/route";
import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { InboundPendingInvites } from "@/components/organisms/server/users/InboundPendingInvites";
import { TextH2 } from "@/components/typography";
import { redirect } from "next/navigation";

export const TeamsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/auth");
  }

  return (
    <PageContentLayout className="py-8">
      <TextH2>{`${user.firstName || user.name}'s Teams`}</TextH2>
      <InboundPendingInvites />
    </PageContentLayout>
  );
};

export default TeamsPage;
