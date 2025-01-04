-- CreateTable
CREATE TABLE "UserRecipePreferences" (
    "userId" TEXT NOT NULL,
    "veganOnly" BOOLEAN NOT NULL,
    "vegetarianOnly" BOOLEAN NOT NULL,
    "enableSuggestions" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRecipePreferences_pkey" PRIMARY KEY ("userId")
);
