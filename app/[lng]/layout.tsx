import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supportedLngs } from "@/i18n";
import type { SupportedLng } from "@/i18n";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
};

// Generate static params for all supported languages
export async function generateStaticParams() {
  return supportedLngs.map((lng) => ({ lng }));
}

// Generate dynamic metadata based on language
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const { lng } = await params;

  // Validate language
  if (!supportedLngs.includes(lng as SupportedLng)) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }

  // Load translations for metadata (using dynamic import for server-side)
  let metadata = {
    title: "Zuply8",
    description: "Advanced planning for wholesalers & retailers",
  };

  try {
    // Dynamically import translation file
    const translations = await import(
      `@/public/locale/${lng}/translation.json`
    );
    metadata = translations.metadata || metadata;
  } catch (error) {
    console.error("Error loading metadata translations:", error);
  }

  // Build alternate language links for SEO with absolute URLs
  const baseUrl = "https://zuply8.com";
  const languages: Record<string, string> = {
    "x-default": baseUrl,
  };
  supportedLngs.forEach((lang) => {
    languages[lang] = `${baseUrl}/${lang}`;
  });

  return {
    title: metadata.title || "Zuply8",
    description:
      metadata.description || "Advanced planning for wholesalers & retailers",
    alternates: {
      canonical: `${baseUrl}/${lng}`,
      languages,
    },
    openGraph: {
      title: metadata.title || "Zuply8",
      description:
        metadata.description ||
        "Advanced planning for wholesalers & retailers",
      url: `/${lng}`,
      siteName: "Zuply8",
      locale: lng === "en" ? "en_US" : lng === "de" ? "de_DE" : "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title || "Zuply8",
      description:
        metadata.description ||
        "Advanced planning for wholesalers & retailers",
    },
  };
}

export default async function LanguageLayout({ children, params }: Props) {
  const { lng } = await params;

  // Validate the language parameter
  if (!supportedLngs.includes(lng as SupportedLng)) {
    notFound();
  }

  return <>{children}</>;
}

