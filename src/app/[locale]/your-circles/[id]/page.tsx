"use server";

import { getCurrentUser } from "@/app/api/users/current/route";
import { EmptyResultsIndicator } from "@/components/atoms/EmptyResultsIndicator";
import { RecipeListing } from "@/components/features/recipes/RecipeListing";
import { PageContentLayout } from "@/components/layouts/PageContentLayout";
import { CircleInvites } from "@/components/molecules/info-display/CircleInvites";
import { CircleMembers } from "@/components/molecules/info-display/CircleMembers";
import { ForbiddenError } from "@/components/organisms/errors/ForbiddenError";
import { NotFoundError } from "@/components/organisms/errors/NotFoundError";
import { TextH2 } from "@/components/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "@/i18n/server-navigation";
import { isForbiddenError, isNotFoundError } from "@/lib/errors";
import { getCircleRecipes } from "@/lib/server-actions/circles/getCircleRecipes";
import { getCircleById } from "@/lib/server-actions/recipes/getCircleById";
import { CircleFullInfoDto } from "@/types/api";

export default async function CirclePage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/auth");
  }

  let circle: CircleFullInfoDto | null = null;

  try {
    circle = await getCircleById(params.id);
  } catch (error) {
    if (isNotFoundError(error)) return <NotFoundError />;
    if (isForbiddenError(error)) return <ForbiddenError />;
    throw error;
  }

  const circleRecipes = await getCircleRecipes(params.id);

  const isOwner = user.id === circle?.circleOwnerId;

  return (
    <PageContentLayout
      className="py-8 gap-6"
      breadcrumbs={[
        { label: "Twoje koła", href: "/your-circles" },
        { label: circle.name },
      ]}
    >
      <TextH2>{circle?.name}</TextH2>
      <Tabs defaultValue="recipes" className="w-full">
        <TabsList>
          <TabsTrigger value="recipes">Przepisy</TabsTrigger>
          {isOwner && <TabsTrigger value="manage">Zarządzaj</TabsTrigger>}
        </TabsList>

        <TabsContent value="recipes" className="flex flex-col gap-4 pt-4">
          {circleRecipes.map((circleRecipe) => (
            <RecipeListing
              key={circleRecipe.recipe.id}
              recipe={circleRecipe.recipe}
              user={user}
            />
          ))}
          {!circleRecipes.length && (
            <EmptyResultsIndicator message="Brak przepisów w tym kole" />
          )}
        </TabsContent>

        {isOwner && (
          <TabsContent value="manage" className="flex flex-col gap-8 pt-4">
            <CircleMembers members={circle?.circleMembers || []} />
            <CircleInvites
              circleId={params.id}
              circleInvites={circle?.circleInvite || []}
            />
          </TabsContent>
        )}
      </Tabs>
    </PageContentLayout>
  );
}
