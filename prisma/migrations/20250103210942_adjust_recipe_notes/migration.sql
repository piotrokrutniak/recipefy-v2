/*
  Warnings:

  - The primary key for the `UserRecipeNote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserRecipeNote` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,recipeId]` on the table `UserRecipeNote` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserRecipeNote" DROP CONSTRAINT "UserRecipeNote_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "UserRecipeNote_userId_recipeId_key" ON "UserRecipeNote"("userId", "recipeId");
