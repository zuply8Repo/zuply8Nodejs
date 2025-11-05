import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies, headers } from "next/headers";
import "./globals.css";
import { I18nClientProvider } from "./lib/i18n/client";
import { supportedLngs, fallbackLng } from "@/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zuply8 - Advanced Planning for Wholesalers & Retailers",
  description: "Transform your planning cycle with Zuply8",
};

async function detectLng(): Promise<string> {
  const c = (await cookies()).get("lng")?.value;
  if (c && (supportedLngs as readonly string[]).includes(c)) return c;
  const accept = (await headers()).get("accept-language") ?? "";
  const pref = accept.split(",")[0]?.split("-")[0];
  if (pref && (supportedLngs as readonly string[]).includes(pref)) return pref;
  return fallbackLng;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lng = await detectLng();

  return (
    <html lang={lng}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nClientProvider lng={lng}>{children}</I18nClientProvider>
      </body>
    </html>
  );
}
