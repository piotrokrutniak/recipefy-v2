import { AccountDetailsSection } from "@/components/features/profile/AccountDetailsSection";
import { ProfileSideBarHeaderClient } from "@/components/features/profile/ProfileSideBarHeaderClient";
import { ProfileSideBarNavigation } from "@/components/features/profile/ProfileSideBarNavigation";
import { RecipeSuggestionsSection } from "@/components/features/profile/RecipeSuggestionsSection";
import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { PageContentSidebarLayout } from "@/components/layouts/PageContentSidebarLayout";
import { ClientProvidersWrapper } from "@/components/providers/ProvidersWrapper";
import { getCurrentUser } from "@/app/api/users/current/route";

import { redirect } from "@/i18n/server-navigation";

export const ProfilePage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/auth");
  }

  return (
    <ClientProvidersWrapper>
      <PageContentSidebarLayout className="">
        <PageContentLayout className="flex-grow-0 sticky top-20 h-fit max-sm:hidden self-start">
          <ProfileSideBarHeaderClient user={user!} />
          <ProfileSideBarNavigation />
        </PageContentLayout>
        <PageContentLayout>
          <AccountDetailsSection />
          <RecipeSuggestionsSection />
        </PageContentLayout>
      </PageContentSidebarLayout>
    </ClientProvidersWrapper>
  );
};

export default ProfilePage;
