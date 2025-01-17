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
import { getCurrentUserOwnedCircles } from "@/lib/server-actions/recipes/getCurrentUserOwnedCircles";
import { UserPendingCircleInvites } from "@/components/molecules/info-display/UserPendingCircleInvites";

export const ProfilePage = async () => {
  const user = await getCurrentUser();
  const circles = await getCurrentUserOwnedCircles();

  if (!user) {
    return redirect("/auth");
  }

  return (
    <ClientProvidersWrapper>
      <PageContentSidebarLayout className="">
        <PageContentLayout className="flex-grow-0 sticky top-0 h-fit">
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
