import { AccountDetailsSection } from "@/components/features/profile/AccountDetailsSection";
import { ProfileSideBarHeaderClient } from "@/components/features/profile/ProfileSideBarHeaderClient";
import { ProfileSideBarNavigation } from "@/components/features/profile/ProfileSideBarNavigation";
import { RecipeSuggestionsSection } from "@/components/features/profile/RecipeSuggestionsSection";
import { CirclesSection } from "@/components/features/profile/TeamsSection";
import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { PageContentSidebarLayout } from "@/components/layouts/PageContentSidebarLayout";
import { ClientProvidersWrapper } from "@/components/providers/ProvidersWrapper";
import { getCurrentUser } from "../api/users/current/route";
import { redirect } from "next/navigation";
import { getUserOwnedCircles } from "@/lib/server-actions/recipes/getUserOwnedCircles";
import { UserPendingCircleInvites } from "@/components/molecules/info-display/UserPendingCircleInvites";

export const ProfilePage = async () => {
  const user = await getCurrentUser();
  const circles = await getUserOwnedCircles();

  if (!user) {
    return redirect("/auth");
  }

  return (
    <ClientProvidersWrapper>
      <PageContentSidebarLayout>
        <PageContentLayout className="flex-grow-0">
          <ProfileSideBarHeaderClient user={user!} />
          <ProfileSideBarNavigation />
        </PageContentLayout>
        <PageContentLayout>
          <AccountDetailsSection />
          <RecipeSuggestionsSection />
          <CirclesSection circles={circles} />
          <UserPendingCircleInvites />
        </PageContentLayout>
      </PageContentSidebarLayout>
    </ClientProvidersWrapper>
  );
};

export default ProfilePage;
