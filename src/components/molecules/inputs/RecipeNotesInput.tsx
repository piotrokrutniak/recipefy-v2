"use client";

import { OutlineContainer } from "@/components/atoms/OutlineContainer";
import { TextH4, TextMuted } from "@/components/typography";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { putRecipeNote } from "@/lib/server-actions/recipes/putRecipeNote";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const RecipeNotesInput = ({
  recipeId,
  initialNote,
}: {
  recipeId: string;
  initialNote?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { refresh } = useRouter();
  const t = useTranslations("recipes.detail");

  const handleSave = async (note: string) => {
    setIsLoading(true);
    try {
      toast({ title: t("notesSaving"), description: t("notesSavingDesc") });
      await putRecipeNote(recipeId, note);
      toast({ title: t("notesSaved"), description: t("notesSavedDesc") });
      refresh();
    } catch (error) {
      console.error(error);
      toast({ title: t("notesSaveError"), description: t("notesSaveErrorDesc") });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OutlineContainer className="flex flex-col gap-4">
      <TextH4>{t("notes")}</TextH4>
      <Textarea
        defaultValue={initialNote}
        onBlur={(e) => handleSave(e.currentTarget.value)}
        disabled={isLoading}
        placeholder={t("notesPlaceholder")}
        className="w-full min-h-64"
      />
      <TextMuted>{t("notesPrivacy")}</TextMuted>
    </OutlineContainer>
  );
};
