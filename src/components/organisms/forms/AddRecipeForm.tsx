"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Ingredient,
  Recipe,
  RecipeIngredient,
  Visibility,
} from "@prisma/client";
import { Button } from "@/components/ui/button";
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
import { useMutationCreateRecipe } from "@/hooks/api/recipes/mutations/useMutationCreateRecipe";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createRecipeSchema } from "@/app/api/recipes/route";
import { useEffect } from "react";
import { QuillEditor } from "@/components/molecules/markup/QuillEditor";
import { RecipeIngredientsInfoInput } from "@/components/molecules/inputs/RecipeIngredientsInfoInput";

export type RecipeFormData = z.infer<typeof createRecipeSchema>;

interface AddRecipeFormProps {
  verifiedIngredients: Ingredient[];
  onSubmitAction?: (data: Recipe) => void;
}

export const AddRecipeForm = ({
  verifiedIngredients,
  onSubmitAction,
}: AddRecipeFormProps) => {
  const {
    mutate: createRecipe,
    data: createdRecipe,
    isSuccess,
    isPending,
  } = useMutationCreateRecipe();
  const form = useForm<RecipeFormData>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      cookTime: 0,
      prepTime: 0,
      servings: 1,
      vegan: false,
      vegetarian: false,
      visibility: Visibility.PRIVATE,
      recipeIngredients: [],
    },
  });

  const onSubmit = (data: RecipeFormData) => {
    // remove empty ingredient lines
    const purifiedData = {
      ...data,
      recipeIngredients: data.recipeIngredients.filter((i) => i.ingredientId),
    };
    createRecipe(purifiedData);
  };

  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState.errors]);

  useEffect(() => {
    if (isSuccess) {
      onSubmitAction?.(createdRecipe.data);
    }
  }, [createdRecipe, isSuccess, onSubmitAction]);

  const getUpdatedIngredients = (
    recipeIngredients: Partial<RecipeIngredient>[],
    index: number,
    ingredient?: Partial<RecipeIngredient>
  ) => {
    const existingRecipe = recipeIngredients.find(
      (i) => i?.ingredientId === ingredient?.ingredientId
    );

    const updatedIngredients = [...recipeIngredients];
    updatedIngredients[index] = {
      ...existingRecipe,
      ...ingredient,
    };

    if (
      updatedIngredients.filter(
        (i) => i?.ingredientId === ingredient?.ingredientId
      ).length > 1
    ) {
      return recipeIngredients;
    }

    return updatedIngredients;
  };

  const emptyIngredient = {
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    ingredientId: null,
    userIngredientId: null,
    amount: "",
    recipeId: "",
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-full max-w-[1024px] gap-4"
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
                  className="resize-none min-h-[180px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  <SelectItem value="PUBLIC">Public</SelectItem>
                  <SelectItem value="PRIVATE">Private</SelectItem>
                  <SelectItem value="UNLISTED">Unlisted</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="prepTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prep Time (min)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
                <FormLabel>Cook Time (min)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
                    min={1}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="vegetarian"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="font-normal">Vegetarian</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vegan"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="font-normal">Vegan</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="recipeIngredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredients</FormLabel>
              <FormControl>
                <RecipeIngredientsInfoInput
                  recipeIngredients={field.value as RecipeIngredient[]}
                  verifiedIngredients={verifiedIngredients}
                  addIngredient={() =>
                    field.onChange([...field.value, emptyIngredient])
                  }
                  removeIngredient={(ingredientId) => {
                    field.onChange(
                      field.value.filter((i) => i?.id !== ingredientId)
                    );
                  }}
                  updateIngredient={(ingredient, index) =>
                    field.onChange(
                      getUpdatedIngredients(field.value, index, ingredient)
                    )
                  }
                />
              </FormControl>
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

        <Button
          disabled={isSuccess || isPending}
          type="submit"
          className="w-full"
        >
          {isSuccess ? "Recipe created" : "Create Recipe"}
        </Button>
      </form>
    </Form>
  );
};
