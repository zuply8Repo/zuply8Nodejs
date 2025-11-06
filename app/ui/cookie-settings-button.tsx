"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCookieConsent } from "../lib/context/cookie-consent-context";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export function CookieSettingsButton() {
  const { i18n } = useTranslation();
  const { openPreferences } = useCookieConsent();
  const [translationsLoaded, setTranslationsLoaded] = useState(false);
  const [renderKey, setRenderKey] = useState(0);

  // Force load the namespace and verify translations actually work
  useEffect(() => {
    let mounted = true;
    let checkInterval: NodeJS.Timeout;

    const verifyTranslationsWork = () => {
      const testKey = "cookies.settingsButton";
      const translated = i18n.t(testKey);
      const works = translated !== testKey && translated !== "";

      if (works && mounted) {
        setTranslationsLoaded(true);
        setRenderKey((prev) => prev + 1); // Force re-render
        if (checkInterval) clearInterval(checkInterval);
        return true;
      }
      return false;
    };

    // Load the namespace first
    i18n.loadNamespaces("translation").then(() => {
      if (!verifyTranslationsWork()) {
        checkInterval = setInterval(() => {
          verifyTranslationsWork();
        }, 100);
      }
    });

    // Check if already working
    verifyTranslationsWork();

    return () => {
      mounted = false;
      if (checkInterval) clearInterval(checkInterval);
    };
  }, [i18n]);

  // Don't render until translations are loaded
  if (!translationsLoaded) {
    return null;
  }

  // Get fresh t function after translations are loaded
  const t = i18n.t.bind(i18n);

  return (
    <button
      onClick={openPreferences}
      className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
      aria-label={t("cookies.settingsButton")}
    >
      <Cog6ToothIcon className="h-5 w-5" />
      <span>{t("cookies.settingsButton")}</span>
    </button>
  );
}
