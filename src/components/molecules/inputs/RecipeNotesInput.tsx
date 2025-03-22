"use client";

import { OutlineContainer } from "@/components/atoms/OutlineContainer";
import { TextH4, TextMuted } from "@/components/typography";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { putRecipeNote } from "@/lib/server-actions/recipes/putRecipeNote";
import { useRouter } from "next/navigation";
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

  const handleSave = async (note: string) => {
    setIsLoading(true);
    try {
      toast({
        title: "Saving note...",
        description: "Your note is being saved",
      });
      await putRecipeNote(recipeId, note);
      toast({
        title: "Note saved",
        description: "Your note has been saved",
      });
      refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error saving note",
        description: `There was an error saving your note`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OutlineContainer className="flex flex-col gap-4">
      <TextH4>Notes</TextH4>
      <Textarea
        defaultValue={initialNote}
        onBlur={(e) => handleSave(e.currentTarget.value)}
        disabled={isLoading}
        placeholder="Enter your notes here..."
        className="w-full min-h-64"
      />
      <TextMuted>Only you can see this note</TextMuted>
    </OutlineContainer>
  );
};
