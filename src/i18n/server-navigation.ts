import { getLocale } from "next-intl/server";
import { redirect as nextRedirect } from "next/navigation";

export async function redirect(path: string): Promise<never> {
  const locale = await getLocale();
  return nextRedirect(`/${locale}${path}`);
}
