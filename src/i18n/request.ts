import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "pl")) {
    locale = routing.defaultLocale;
  }

  const [general, navigation, landing, recipes, auth, admin] = await Promise.all([
    import(`../../messages/${locale}/general.json`),
    import(`../../messages/${locale}/navigation.json`),
    import(`../../messages/${locale}/landing.json`),
    import(`../../messages/${locale}/recipes.json`),
    import(`../../messages/${locale}/auth.json`),
    import(`../../messages/${locale}/admin.json`),
  ]);

  return {
    locale,
    messages: {
      general: general.default,
      navigation: navigation.default,
      landing: landing.default,
      recipes: recipes.default,
      auth: auth.default,
      admin: admin.default,
    },
  };
});
