"use client";

import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

const LANGS = ["en", "es", "de"] as const;

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  async function setLang(lng: string) {
    // 1) update client i18n immediately (instant UI feedback)
    i18n.changeLanguage(lng as any);

    // 2) persist for server components, then refresh RSC tree
    startTransition(async () => {
      await fetch("/api/set-lng", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lng }),
      });
      router.refresh(); // re-render server components in the new lang
    });
  }

  return (
    <div className="inline-flex gap-2">
      {LANGS.map((lng) => (
        <button
          key={lng}
          onClick={() => setLang(lng)}
          aria-pressed={i18n.language === lng}
          className={`px-3 py-1 rounded border ${
            i18n.language === lng ? "font-semibold" : ""
          } ${pending ? "opacity-60" : ""}`}
          disabled={pending}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
