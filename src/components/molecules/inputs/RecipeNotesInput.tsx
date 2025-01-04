"use client";

import { OutlineContainer } from "@/components/atoms/OutlineContainer";
import { TextH4, TextLead, TextMuted } from "@/components/typography";
import { Textarea } from "@/components/ui/textarea";
import { useMutationAddRecipeNote } from "@/hooks/api/recipes/mutations/useMutationAddRecipeNote";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export const RecipeNotesInput = ({
  recipeId,
  initialNote,
}: {
  recipeId: string;
  initialNote?: string;
}) => {
  const {
    mutate: addRecipeNote,
    isPending,
    data,
    isSuccess,
    isError,
    error,
  } = useMutationAddRecipeNote();
  const [note, setNote] = useState(initialNote);
  const { toast } = useToast();

  const handleSave = () => {
    if (!note || data?.data === note) {
      return;
    }

    addRecipeNote({ note, recipeId });
    toast({
      title: "Saving note...",
      description: "Your note is being saved",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Note saved",
        description: "Your note has been saved",
      });
      return;
    }

    if (isError) {
      toast({
        title: "Error saving note",
        description: `There was an error saving your note: ${error?.message}`,
      });
    }
  }, [isSuccess, isError]);

  return (
    <OutlineContainer className="flex flex-col gap-4">
      <TextH4>Notes</TextH4>
      <Textarea
        onChange={(e) => {
          setNote(e.currentTarget.value);
        }}
        onBlur={handleSave}
        disabled={isPending}
        value={note}
        placeholder="Enter your notes here..."
        className="w-full min-h-64"
      />
      <TextMuted>Only you can see this note</TextMuted>
    </OutlineContainer>
  );
};
