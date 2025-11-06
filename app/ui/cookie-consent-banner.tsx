"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCookieConsent } from "../lib/context/cookie-consent-context";

export function CookieConsentBanner() {
  const { i18n } = useTranslation();
  const { showBanner, acceptAll, rejectAll, openPreferences } =
    useCookieConsent();
  const [translationsLoaded, setTranslationsLoaded] = useState(false);
  const [renderKey, setRenderKey] = useState(0);

  // Force load the namespace and verify translations actually work
  useEffect(() => {
    let mounted = true;
    let checkInterval: NodeJS.Timeout;

    const verifyTranslationsWork = () => {
      // Actually test if translation works, not just if bundle exists
      const testKey = "cookies.banner.title";
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
    i18n
      .loadNamespaces("translation")
      .then(() => {
        // Check immediately
        if (!verifyTranslationsWork()) {
          // If not working yet, poll every 100ms
          checkInterval = setInterval(() => {
            verifyTranslationsWork();
          }, 100);
        }
      })
      .catch((error) => {
        console.error("🍪 Banner - Error loading namespace:", error);
      });

    return () => {
      mounted = false;
      if (checkInterval) clearInterval(checkInterval);
    };
  }, [i18n]);

  // Don't show banner until translations are loaded
  if (!showBanner || !translationsLoaded) {
    return null;
  }

  // Get fresh t function after translations are loaded
  const t = i18n.t.bind(i18n);

  return (
    <>
      {/* Backdrop overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" aria-hidden="true" />

      {/* Banner */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-white border-t-2 border-gray-200 shadow-2xl"
        role="dialog"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-description"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Text content */}
            <div className="flex-1">
              <h2
                id="cookie-banner-title"
                className="text-lg font-semibold text-gray-900 mb-2"
              >
                {t("cookies.banner.title")}
              </h2>
              <p
                id="cookie-banner-description"
                className="text-sm text-gray-600"
              >
                {t("cookies.banner.description")}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 sm:shrink-0">
              <button
                onClick={rejectAll}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                aria-label={t("cookies.banner.rejectAll")}
              >
                {t("cookies.banner.rejectAll")}
              </button>

              <button
                onClick={openPreferences}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label={t("cookies.banner.customize")}
              >
                {t("cookies.banner.customize")}
              </button>

              <button
                onClick={acceptAll}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label={t("cookies.banner.acceptAll")}
              >
                {t("cookies.banner.acceptAll")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
