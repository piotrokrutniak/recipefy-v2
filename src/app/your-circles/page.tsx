import { getCurrentUser } from "@/app/api/users/current/route";
import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { CirclesSummary } from "@/components/molecules/info-display/CirclesSummary";
import { getCurrentUserOwnedCircles } from "@/lib/server-actions/recipes/getCurrentUserOwnedCircles";
import { getUserJoinedCircles } from "@/lib/server-actions/users/getUserJoinedCircles";
import { redirect } from "next/navigation";

export const CirclesPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/auth");
  }

  const userOwnedCircles = await getCurrentUserOwnedCircles();
  const userJoinedCircles = await getUserJoinedCircles();

  return (
    <PageContentLayout className="py-8">
      <CirclesSummary
        headerText="Circles you're an owner of"
        emptyMessage="No Circles owned yet"
        circles={userOwnedCircles}
      />
      <CirclesSummary
        headerText="Circles you've joined"
        circles={userJoinedCircles}
        emptyMessage="No Circles joined yet"
      />
    </PageContentLayout>
  );
};

export default CirclesPage;
