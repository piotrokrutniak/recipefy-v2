const toBaseSlug = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const generateSlug = (title: string, id: string): string => {
  const base = toBaseSlug(title) || "recipe";
  return `${base}-${id.slice(0, 8)}`;
};
