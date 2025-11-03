// i18n.ts
export const defaultNS = "translation";
export const fallbackLng = "en";
export const supportedLngs = ["en", "es", "de"] as const;
export type SupportedLng = (typeof supportedLngs)[number];

export const i18nConfig = {
  defaultNS,
  fallbackLng,
  supportedLngs,
  // react-i18next settings applied on both server & client
  interpolation: { escapeValue: false },
} as const;
