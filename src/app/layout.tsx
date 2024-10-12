import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import { PageLayout } from "@/components/layouts/PageLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProvidersWrapper } from "@/components/providers/ProvidersWrapper";

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
    <html lang="en">
      <ProvidersWrapper>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          <PageLayout>{children}</PageLayout>
        </body>
      </ProvidersWrapper>
    </html>
  );
}
