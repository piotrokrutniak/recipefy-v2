/*
  Warnings:

  - You are about to drop the column `publishAt` on the `RecipeIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `RecipeIngredient` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_userIngredientId_fkey";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "publishAt" TIMESTAMP(3),
ADD COLUMN     "shouldPublish" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "thumbnailUrl" TEXT;

-- AlterTable
ALTER TABLE "RecipeIngredient" DROP COLUMN "publishAt",
DROP COLUMN "published",
ALTER COLUMN "ingredientId" DROP NOT NULL,
ALTER COLUMN "userIngredientId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_userIngredientId_fkey" FOREIGN KEY ("userIngredientId") REFERENCES "UserIngredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
