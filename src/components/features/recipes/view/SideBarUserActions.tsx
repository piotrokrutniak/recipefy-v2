"use client";

import { useEffect, useState } from "react";
import { Circle, User } from "@prisma/client";
import { RecipeFullInfoDto } from "@/types/api";
import { LikeButton } from "@/components/molecules/buttons/LikeButton";
import { AuthorControls } from "./AuthorControlsClient";
import { RecipeNotesInput } from "@/components/molecules/inputs/RecipeNotesInput";
import { ClientProvidersWrapper } from "@/components/providers/ProvidersWrapper";

export const SideBarUserActions = ({
  recipe,
  circles,
}: {
  recipe: RecipeFullInfoDto;
  circles: Circle[];
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [initialNote, setInitialNote] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetch("/api/users/current")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data))
      .catch(() => {});

    fetch(`/api/recipes/${recipe.id}/add-note`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setInitialNote(data?.note ?? undefined))
      .catch(() => {});
  }, [recipe.id]);

  if (!user) return null;

  return (
    <>
      {user.id === recipe.authorId && (
        <AuthorControls recipe={recipe} circles={circles} />
      )}
      <ClientProvidersWrapper>
        <LikeButton recipe={recipe} full />
      </ClientProvidersWrapper>
      <ClientProvidersWrapper>
        <RecipeNotesInput recipeId={recipe.id} initialNote={initialNote} />
      </ClientProvidersWrapper>
    </>
  );
};
