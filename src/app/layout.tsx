import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/features/navbar/Navbar";
import { Footer } from "@/components/features/footer/Footer";
import { CookieConsentBanner } from "@/components/features/cookie-consent/CookieConsentBanner";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Recipefy",
  description: "Recipify your life with Recipefy", // xdddd
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">
          <PageLayout>{children}</PageLayout>
        </main>
        <Footer />
        <CookieConsentBanner />
        <Toaster />
      </body>
    </html>
  );
}
