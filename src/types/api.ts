import {
  Circle,
  CircleInvite,
  CircleMember,
  CircleRecipe,
  Ingredient,
  Recipe,
  RecipeIngredient,
  User,
  UserIngredient,
} from "@prisma/client";

export type UpdateUserDto = Partial<Omit<User, "id">>;

export type CreateRecipeDto = Partial<Omit<Recipe, "id" | "authorId">>;
export type UpdateRecipeDto = Partial<Omit<Recipe, "authorId">>;
export type RecipeFullInfoDto = Recipe & {
  recipeIngredients: RecipeIngredientDto[];
  author: User;
  circleRecipes: CircleRecipe[];
};

export type RecipeIngredientDto = RecipeIngredient & {
  ingredient: Ingredient;
  userIngredient: UserIngredient;
};

export type CircleInviteFullInfoDto = CircleInvite & {
  circle: Circle;
  invitingUser: User;
  invitee?: User;
};

export type CircleMemberFullInfoDto = CircleMember & {
  user: User;
};

export type CircleFullInfoDto = Circle & {
  circleInvite: CircleInviteFullInfoDto[];
  circleOwner: User;
  circleMembers: CircleMemberFullInfoDto[];
};

export type CircleRecipeFullInfoDto = CircleRecipe & {
  recipe: Recipe;
};
