"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCookieConsent, CookiePreferences } from "../lib/context/cookie-consent-context";
import { XMarkIcon } from "@heroicons/react/24/outline";

export function CookiePreferencesModal() {
  const { i18n } = useTranslation();
  const { showPreferences, closePreferences, updatePreferences, consent } =
    useCookieConsent();
  const [translationsLoaded, setTranslationsLoaded] = useState(false);
  const [renderKey, setRenderKey] = useState(0);

  // Local state for toggles
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  // Initialize with current consent preferences
  useEffect(() => {
    if (consent) {
      setPreferences(consent.preferences);
    }
  }, [consent]);

  // Force load the namespace and verify translations actually work
  useEffect(() => {
    let mounted = true;
    let checkInterval: NodeJS.Timeout;
    
    const verifyTranslationsWork = () => {
      const testKey = "cookies.preferences.title";
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

  // Don't show modal until translations are loaded
  if (!showPreferences || !translationsLoaded) {
    return null;
  }

  // Get fresh t function after translations are loaded
  const t = i18n.t.bind(i18n);

  const handleToggle = (key: keyof CookiePreferences) => {
    // Don't allow toggling necessary cookies
    if (key === "necessary") return;

    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    updatePreferences(preferences);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-50"
        onClick={closePreferences}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preferences-modal-title"
      >
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2
              id="preferences-modal-title"
              className="text-xl font-semibold text-gray-900"
            >
              {t("cookies.preferences.title")}
            </h2>
            <button
              onClick={closePreferences}
              className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
              aria-label="Close"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4 space-y-6">
            {/* Necessary Cookies */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {t("cookies.preferences.necessary.title")}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t("cookies.preferences.necessary.description")}
                  </p>
                </div>
                <div className="shrink-0">
                  <div
                    className="relative inline-flex items-center cursor-not-allowed opacity-50"
                    title={t("cookies.preferences.necessary.alwaysActive") || "Always Active"}
                  >
                    <div className="w-11 h-6 bg-blue-600 rounded-full" />
                    <div className="absolute right-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform" />
                  </div>
                  <span className="ml-2 text-xs text-gray-500">
                    {t("cookies.preferences.alwaysActive") || "Always Active"}
                  </span>
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {t("cookies.preferences.analytics.title")}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t("cookies.preferences.analytics.description")}
                  </p>
                </div>
                <div className="shrink-0">
                  <button
                    onClick={() => handleToggle("analytics")}
                    className="relative inline-flex items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                    role="switch"
                    aria-checked={preferences.analytics}
                    aria-label={t("cookies.preferences.analytics.title")}
                  >
                    <div
                      className={`w-11 h-6 rounded-full transition-colors ${
                        preferences.analytics ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    />
                    <div
                      className={`absolute top-0.5 bg-white w-5 h-5 rounded-full transition-transform ${
                        preferences.analytics ? "translate-x-5.5 right-0.5" : "translate-x-0 left-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {t("cookies.preferences.marketing.title")}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t("cookies.preferences.marketing.description")}
                  </p>
                </div>
                <div className="shrink-0">
                  <button
                    onClick={() => handleToggle("marketing")}
                    className="relative inline-flex items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                    role="switch"
                    aria-checked={preferences.marketing}
                    aria-label={t("cookies.preferences.marketing.title")}
                  >
                    <div
                      className={`w-11 h-6 rounded-full transition-colors ${
                        preferences.marketing ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    />
                    <div
                      className={`absolute top-0.5 bg-white w-5 h-5 rounded-full transition-transform ${
                        preferences.marketing ? "translate-x-5.5 right-0.5" : "translate-x-0 left-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Preference Cookies */}
            <div className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {t("cookies.preferences.preferences.title")}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t("cookies.preferences.preferences.description")}
                  </p>
                </div>
                <div className="shrink-0">
                  <button
                    onClick={() => handleToggle("preferences")}
                    className="relative inline-flex items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                    role="switch"
                    aria-checked={preferences.preferences}
                    aria-label={t("cookies.preferences.preferences.title")}
                  >
                    <div
                      className={`w-11 h-6 rounded-full transition-colors ${
                        preferences.preferences ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    />
                    <div
                      className={`absolute top-0.5 bg-white w-5 h-5 rounded-full transition-transform ${
                        preferences.preferences ? "translate-x-5.5 right-0.5" : "translate-x-0 left-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
            <div className="flex justify-end gap-3">
              <button
                onClick={closePreferences}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t("cookies.preferences.cancel") || "Cancel"}
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t("cookies.preferences.save")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

