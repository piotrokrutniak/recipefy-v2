import { getCurrentUser } from "@/app/api/users/current/route";
import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { CircleInviteInbound } from "@/components/molecules/info-display/CircleInviteInbound";
import { EmptyResultsIndicator } from "@/components/atoms/EmptyResultsIndicator";
import { getCurrentUserOwnedCircles } from "@/lib/server-actions/recipes/getCurrentUserOwnedCircles";
import { getUserJoinedCircles } from "@/lib/server-actions/users/getUserJoinedCircles";
import { getUserCircleInvites } from "@/lib/server-actions/recipes/getUserCircleInvites";
import { redirect } from "@/i18n/server-navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextH2, TextH4 } from "@/components/typography";
import { LinkButton } from "@/components/generic/LinkButton";
import { OutlineContainer } from "@/components/atoms/OutlineContainer";
import { CreateCircleDialog } from "@/components/molecules/dialogs/CreateCircleDialog";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { CircleInviteFullInfoDto } from "@/types/api";
import { Circle } from "@prisma/client";

const JoinedCircleListing = ({ circle }: { circle: Circle }) => (
  <OutlineContainer className="flex items-center justify-between">
    <TextH4>{circle.name}</TextH4>
    <LinkButton href={`/your-circles/${circle.id}`} size="icon" variant="ghost">
      <ChevronRightIcon className="w-4 h-4" />
    </LinkButton>
  </OutlineContainer>
);

export default async function CirclesPage() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/auth");
  }

  const [ownedCircles, joinedCircles, pendingInvites] = await Promise.all([
    getCurrentUserOwnedCircles(),
    getUserJoinedCircles(),
    getUserCircleInvites(),
  ]);

  return (
    <PageContentLayout className="py-8 gap-6" breadcrumbs={[{ label: "Twoje koła" }]}>
      <TextH2 className="w-full">Twoje koła</TextH2>
      <Tabs defaultValue="owned" className="w-full">
        <TabsList>
          <TabsTrigger value="owned">Moje koła</TabsTrigger>
          <TabsTrigger value="joined">Dołączone</TabsTrigger>
          <TabsTrigger value="invites">
            Zaproszenia{pendingInvites.length > 0 ? ` (${pendingInvites.length})` : ""}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="owned" className="flex flex-col gap-3 pt-4">
          <div className="flex justify-end">
            <CreateCircleDialog />
          </div>
          {ownedCircles.map((circle) => (
            <JoinedCircleListing key={circle.id} circle={circle} />
          ))}
          {!ownedCircles.length && (
            <EmptyResultsIndicator message="Nie masz jeszcze żadnych kół" />
          )}
        </TabsContent>

        <TabsContent value="joined" className="flex flex-col gap-3 pt-4">
          {joinedCircles.map((circle) => (
            <JoinedCircleListing key={circle.id} circle={circle} />
          ))}
          {!joinedCircles.length && (
            <EmptyResultsIndicator message="Nie dołączyłeś jeszcze do żadnych kół" />
          )}
        </TabsContent>

        <TabsContent value="invites" className="flex flex-col gap-4 pt-4">
          {pendingInvites.map((invite) => (
            <CircleInviteInbound
              key={invite.id}
              circleInvite={invite as CircleInviteFullInfoDto}
            />
          ))}
          {!pendingInvites.length && (
            <EmptyResultsIndicator message="Brak oczekujących zaproszeń" />
          )}
        </TabsContent>
      </Tabs>
    </PageContentLayout>
  );
}
