import { AccountDetailsSection } from "@/components/features/profile/AccountDetailsSection";
import { ProfileSideBarHeader } from "@/components/features/profile/ProfileSideBarHeader";
import { ProfileSideBarNavigation } from "@/components/features/profile/ProfileSideBarNavigation";
import { RecipeSuggestionsSection } from "@/components/features/profile/RecipeSuggestionsSection";
import { TeamsSection } from "@/components/features/profile/TeamsSection";
import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { PageContentSidebarLayout } from "@/components/layouts/PageContentSidebarLayout";
import { ClientProvidersWrapper } from "@/components/providers/ProvidersWrapper";
import { getCurrentUser } from "../api/users/current/route";
import { redirect } from "next/navigation";

export const ProfilePage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <ClientProvidersWrapper>
      <PageContentSidebarLayout>
        <PageContentLayout className="flex-grow-0">
          <ProfileSideBarHeader user={user!} />
          <ProfileSideBarNavigation />
        </PageContentLayout>
        <PageContentLayout>
          <AccountDetailsSection />
          <RecipeSuggestionsSection />
          <TeamsSection />
        </PageContentLayout>
      </PageContentSidebarLayout>
    </ClientProvidersWrapper>
  );
};

export default ProfilePage;
