import { Navbar } from "@/components/features/navbar/Navbar";
import { Footer } from "@/components/features/footer/Footer";
import { CookieConsentBanner } from "@/components/features/cookie-consent/CookieConsentBanner";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Toaster } from "@/components/ui/toaster";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!routing.locales.includes(locale as "pl")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar />
      <main className="flex-1">
        <PageLayout>{children}</PageLayout>
      </main>
      <Footer />
      <CookieConsentBanner />
      <Toaster />
    </NextIntlClientProvider>
  );
}
