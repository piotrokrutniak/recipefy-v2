"use client";

import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { updateRecipeAvailability } from "@/lib/server-actions/recipes/updateRecipeAvailability";
import { RecipeFullInfoDto } from "@/types/api";
import { Visibility } from "@prisma/client";
import { useCallback, useState } from "react";

export const RecipeAvailabilitySelect = ({
  recipe,
}: {
  recipe: RecipeFullInfoDto;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handleChange = useCallback(
    async (value: string) => {
      try {
        setIsLoading(true);
        await updateRecipeAvailability(recipe.id, value as Visibility);
        toast({
          title: "Success",
          description: "Recipe availability updated",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Error updating recipe availability",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [recipe.id]
  );

  return (
    <Select
      defaultValue={recipe.visibility}
      onValueChange={handleChange}
      disabled={isLoading}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select availability" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={Visibility.PUBLIC}>Public</SelectItem>
        <SelectItem value={Visibility.UNLISTED}>Unlisted</SelectItem>
        <SelectItem value={Visibility.PRIVATE}>Private</SelectItem>
      </SelectContent>
    </Select>
  );
};
