"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// TypeScript types
export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface CookieConsent {
  timestamp: number;
  version: string;
  preferences: CookiePreferences;
}

interface CookieConsentContextType {
  consent: CookieConsent | null;
  showBanner: boolean;
  showPreferences: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  updatePreferences: (preferences: Partial<CookiePreferences>) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  hasConsent: () => boolean;
  hasAnalyticsConsent: () => boolean;
}

const CONSENT_VERSION = "1.0";
const STORAGE_KEY = "cookie-consent";

// Default preferences
const defaultPreferences: CookiePreferences = {
  necessary: true, // Always true
  analytics: false,
  marketing: false,
  preferences: false,
};

// Create context
const CookieConsentContext = createContext<CookieConsentContextType | undefined>(
  undefined
);

// Provider component
export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  // Load consent from localStorage on mount
  useEffect(() => {
    const loadConsent = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: CookieConsent = JSON.parse(stored);
          // Validate version
          if (parsed.version === CONSENT_VERSION) {
            setConsent(parsed);
            setShowBanner(false);
          } else {
            // Version mismatch, show banner again
            setShowBanner(true);
          }
        } else {
          // No consent found, show banner
          setShowBanner(true);
        }
      } catch (error) {
        console.error("Error loading cookie consent:", error);
        setShowBanner(true);
      }
    };

    loadConsent();
  }, []);

  // Save consent to localStorage
  const saveConsent = (preferences: CookiePreferences) => {
    const newConsent: CookieConsent = {
      timestamp: Date.now(),
      version: CONSENT_VERSION,
      preferences,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConsent));
      setConsent(newConsent);
      setShowBanner(false);
      setShowPreferences(false);

      // Reload page to apply analytics changes
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error saving cookie consent:", error);
    }
  };

  // Accept all cookies
  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    });
  };

  // Reject all optional cookies
  const rejectAll = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
  };

  // Update specific preferences
  const updatePreferences = (newPreferences: Partial<CookiePreferences>) => {
    const updatedPreferences: CookiePreferences = {
      necessary: true, // Always true
      analytics: newPreferences.analytics ?? consent?.preferences.analytics ?? false,
      marketing: newPreferences.marketing ?? consent?.preferences.marketing ?? false,
      preferences: newPreferences.preferences ?? consent?.preferences.preferences ?? false,
    };
    saveConsent(updatedPreferences);
  };

  // Check if user has given any consent
  const hasConsent = (): boolean => {
    return consent !== null;
  };

  // Check if analytics consent is granted
  const hasAnalyticsConsent = (): boolean => {
    return consent?.preferences.analytics ?? false;
  };

  // Open preferences modal
  const openPreferences = () => {
    setShowPreferences(true);
  };

  // Close preferences modal
  const closePreferences = () => {
    setShowPreferences(false);
  };

  const value: CookieConsentContextType = {
    consent,
    showBanner,
    showPreferences,
    acceptAll,
    rejectAll,
    updatePreferences,
    openPreferences,
    closePreferences,
    hasConsent,
    hasAnalyticsConsent,
  };

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

// Custom hook to use the context
export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider"
    );
  }
  return context;
}

