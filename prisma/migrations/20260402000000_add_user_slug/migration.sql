-- AlterTable
ALTER TABLE "User" ADD COLUMN "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_slug_key" ON "User"("slug");

-- Backfill: generate slug from name (or email prefix) + first 8 chars of id
UPDATE "User"
SET slug = regexp_replace(
    lower(COALESCE(name, split_part(email, '@', 1), 'user')),
    '[^a-z0-9]+', '-', 'g'
  ) || '-' || substring(id, 1, 8)
WHERE slug IS NULL;
