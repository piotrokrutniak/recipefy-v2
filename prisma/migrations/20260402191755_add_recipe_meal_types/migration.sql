-- CreateEnum
CREATE TYPE "MealType" AS ENUM ('BREAKFAST', 'BRUNCH', 'LUNCH', 'DINNER', 'DESSERT', 'SNACK');

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "mealTypes" "MealType"[];
