"use client";

import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useRouter, usePathname } from "next/navigation";

const LANGS = ["en", "es", "de"] as const;

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  async function setLang(lng: string) {
    // 1) update client i18n immediately (instant UI feedback)
    i18n.changeLanguage(lng as any);

    // 2) persist cookie as fallback and navigate to new URL
    startTransition(async () => {
      // Set cookie for fallback (useful for root page detection)
      await fetch("/api/set-lng", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lng }),
      }).catch(() => {
        // Ignore errors - cookie is just a fallback
      });

      // Navigate to the language-specific URL
      router.push(`/${lng}`);
    });
  }

  return (
    <div className="inline-flex gap-2 mb-6">
      {LANGS.map((lng) => {
        const isActive = i18n.language === lng;
        return (
          <button
            key={lng}
            onClick={() => setLang(lng)}
            aria-pressed={isActive}
            disabled={pending}
            className={`
              inline-flex items-center justify-center
              px-4 py-2 rounded-full
              text-sm font-semibold
              transition-all duration-200 ease-in-out
              ${
                isActive
                  ? "bg-linear-to-r from-indigo-600 to-indigo-700 text-white shadow-[0_10px_30px_-15px_rgba(99,102,241,0.65)] hover:shadow-[0_20px_45px_-20px_rgba(99,102,241,0.75)] hover:-translate-y-0.5"
                  : "bg-indigo-500/10 border border-indigo-500/20 text-indigo-200/90 hover:bg-indigo-500/15 hover:border-indigo-500/30 hover:text-indigo-100"
              }
              ${pending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            {lng.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
