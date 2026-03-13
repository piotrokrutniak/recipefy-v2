import DBClient from "@/persistence/DBClient";

const prisma = DBClient.getInstance().prisma;

const toBaseSlug = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const generateSlug = async (title: string, excludeId?: string): Promise<string> => {
  const base = toBaseSlug(title) || "recipe";

  const existing = await prisma.recipe.findMany({
    where: {
      slug: { startsWith: base },
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
    select: { slug: true },
  });

  const taken = new Set(existing.map((r) => r.slug));

  if (!taken.has(base)) return base;

  let i = 1;
  while (taken.has(`${base}-${i}`)) i++;
  return `${base}-${i}`;
};
