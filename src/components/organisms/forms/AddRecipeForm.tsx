"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Ingredient,
  MealType,
  Recipe,
  RecipeIngredient,
  UserIngredient,
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
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { FaLeaf, FaSeedling } from "react-icons/fa";
import { useMutationCreateRecipe } from "@/hooks/api/recipes/mutations/useMutationCreateRecipe";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useEffect, useMemo, useState } from "react";
import { QuillEditor } from "@/components/molecules/markup/QuillEditor";
import { RecipeIngredientsInfoInput } from "@/components/molecules/inputs/RecipeIngredientsInfoInput";
import { UploadImageAssetInput } from "@/components/molecules/inputs/UploadImageAssetInput";
import { createRecipeSchema } from "@/lib/server-actions/recipes/createRecipe.schema";
import { getUserIngredients } from "@/lib/server-actions/ingredients/getUserIngredients";
import { SelectableIngredient } from "@/components/molecules/search/IngredientSearchContainer";

export type RecipeFormData = z.infer<typeof createRecipeSchema>;

interface AddRecipeFormProps {
  verifiedIngredients: Ingredient[];
  onSubmitAction?: (data: Recipe) => void;
}

export const AddRecipeForm = ({
  verifiedIngredients,
  onSubmitAction,
}: AddRecipeFormProps) => {
  const tBadges = useTranslations("recipes.badges");
  const tMealTypes = useTranslations("recipes.mealTypes");
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
      mealTypes: [],
      visibility: Visibility.PRIVATE,
      recipeIngredients: [],
    },
  });
  const vegan = form.watch("vegan");
  const vegetarian = form.watch("vegetarian");
  const mealTypes = form.watch("mealTypes");

  const toggleDiet = (field: "vegan" | "vegetarian") => {
    form.setValue(field, !form.getValues(field));
  };

  const toggleMealType = (type: MealType) => {
    const current = form.getValues("mealTypes") ?? [];
    const next = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    form.setValue("mealTypes", next);
  };

  const [userIngredients, setUserIngredients] = useState<UserIngredient[]>([]);

  const fetchUserIngredients = useCallback(async () => {
    const userIngredients = await getUserIngredients();
    setUserIngredients(userIngredients);
  }, []);

  useEffect(() => {
    fetchUserIngredients();
  }, [fetchUserIngredients]);

  const selectableIngredients: SelectableIngredient[] = useMemo(() => {
    return [...verifiedIngredients, ...userIngredients];
  }, [verifiedIngredients, userIngredients]);

  const onSubmit = (data: RecipeFormData) => {
    // remove empty ingredient lines
    const purifiedData = {
      ...data,
      recipeIngredients: data.recipeIngredients.filter((i) => i.ingredientId),
    };
    createRecipe(purifiedData);
  };

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
        className="flex flex-col w-full max-w-[1024px] gap-4 my-4"
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
          name="thumbnailUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <UploadImageAssetInput
                  onChange={(file) => {
                    if (file) {
                      form.setValue("thumbnailBase64", file);
                    } else {
                      field.onChange(undefined);
                      form.setValue("thumbnailBase64", undefined);
                    }
                  }}
                  uploadedThumbnailUrl={form.watch("thumbnailUrl")}
                  draftThumbnailBase64={form.watch("thumbnailBase64")}
                />
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

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => toggleDiet("vegetarian")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border transition-colors",
              vegetarian
                ? "bg-green-100 border-green-500 text-green-700"
                : "border-input text-muted-foreground hover:border-green-400 hover:text-green-700"
            )}
          >
            <FaSeedling className="w-3 h-3" />
            {tBadges("vegetarian")}
          </button>
          <button
            type="button"
            onClick={() => toggleDiet("vegan")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border transition-colors",
              vegan
                ? "bg-green-100 border-green-500 text-green-700"
                : "border-input text-muted-foreground hover:border-green-400 hover:text-green-700"
            )}
          >
            <FaLeaf className="w-3 h-3" />
            {tBadges("vegan")}
          </button>
          {Object.values(MealType).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => toggleMealType(type)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border transition-colors",
                (mealTypes ?? []).includes(type)
                  ? "bg-orange-100 border-orange-500 text-orange-700"
                  : "border-input text-muted-foreground hover:border-orange-400 hover:text-orange-700"
              )}
            >
              {tMealTypes(type)}
            </button>
          ))}
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
                  selectableIngredients={selectableIngredients}
                  refreshIngredients={fetchUserIngredients}
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
