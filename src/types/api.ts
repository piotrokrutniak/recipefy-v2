import {
  Circle,
  CircleInvite,
  CircleMember,
  Ingredient,
  Recipe,
  RecipeIngredient,
  User,
} from "@prisma/client";

export type UpdateUserDto = Partial<Omit<User, "id">>;

export type CreateRecipeDto = Partial<Omit<Recipe, "id" | "authorId">>;
export type UpdateRecipeDto = Partial<Omit<Recipe, "authorId">>;
export type RecipeFullInfoDto = Recipe & {
  recipeIngredients: RecipeIngredientDto[];
  author: User;
};

export type RecipeIngredientDto = RecipeIngredient & {
  ingredient: Ingredient;
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
