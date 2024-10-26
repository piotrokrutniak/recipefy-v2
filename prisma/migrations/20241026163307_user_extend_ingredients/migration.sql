/*
  Warnings:

  - You are about to drop the column `amount` on the `UserIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientId` on the `UserIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `UserIngredient` table. All the data in the column will be lost.
  - Added the required column `vegan` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vegetarian` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `UserIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "vegan" BOOLEAN NOT NULL,
ADD COLUMN     "vegetarian" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "UserIngredient" DROP COLUMN "amount",
DROP COLUMN "ingredientId",
DROP COLUMN "unit",
ADD COLUMN     "name" TEXT NOT NULL;
