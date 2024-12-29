"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Recipe, Visibility } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createRecipeSchema } from "@/app/api/recipes/route";
import { useEffect } from "react";
import { useMutationEditRecipe } from "@/hooks/api/recipes/mutations/useMutationEditRecipe";
import { QuillEditor } from "@/components/molecules/markup/QuillEditor";

export type RecipeFormData = z.infer<typeof createRecipeSchema>;

type EditRecipeFormProps = {
  recipe: Recipe;
  onSubmitAction?: (data: Recipe) => void;
};

export const EditRecipeForm = ({
  recipe,
  onSubmitAction,
}: EditRecipeFormProps) => {
  const {
    mutate: updateRecipe,
    data: updatedRecipe,
    isSuccess,
    isPending,
  } = useMutationEditRecipe();

  const form = useForm<RecipeFormData>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      title: recipe.title,
      description: recipe.description,
      content: recipe.content,
      cookTime: recipe.cookTime,
      prepTime: recipe.prepTime,
      servings: recipe.servings,
      vegan: recipe.vegan,
      vegetarian: recipe.vegetarian,
      visibility: recipe.visibility,
    },
  });

  const onSubmit = (data: RecipeFormData) => {
    updateRecipe({ id: recipe.id, ...data });
  };

  useEffect(() => {
    if (isSuccess) {
      onSubmitAction?.(updatedRecipe.data);
    }
  }, [updatedRecipe, isSuccess, onSubmitAction]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Recipe title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Recipe description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="prepTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prep Time (minutes)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Prep time"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cookTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cook Time (minutes)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Cook time"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="servings"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Servings</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Number of servings"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="vegetarian"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Vegetarian</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vegan"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Vegan</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="visibility"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visibility</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={Visibility.PUBLIC}>Public</SelectItem>
                  <SelectItem value={Visibility.PRIVATE}>Private</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <QuillEditor
                  value={form.getValues("content")}
                  onChange={(value) => form.setValue("content", value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </Form>
  );
};
