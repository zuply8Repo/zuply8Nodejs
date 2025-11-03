// app/lib/i18n/server.ts
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next"; // tree-shakable entry
import resourcesToBackend from "i18next-resources-to-backend";
import { headers, cookies } from "next/headers";
import { i18nConfig, defaultNS, supportedLngs, fallbackLng } from "@/i18n";

function detectLng(): string {
  // 1) cookie set by your UI (e.g., "lng=es")
  const lngCookie = cookies().get("lng")?.value;
  if (lngCookie && supportedLngs.includes(lngCookie as any)) return lngCookie;

  // 2) Accept-Language
  const accept = headers().get("accept-language") || "";
  const match = accept.split(",")[0]?.trim().split("-")[0];
  if (match && supportedLngs.includes(match as any)) return match;

  // 3) fallback
  return fallbackLng;
}

export async function getServerI18n(ns: string | string[] = defaultNS) {
  const lng = detectLng();

  const i18n = createInstance();

  i18n
    // Load JSON like: /public/locale/en/translation.json
    .use(
      resourcesToBackend((language: string, namespace: string) =>
        import(
          /* webpackChunkName: "i18n-[request]" */
          `public/locale/${language}/${namespace}.json`
        ).then((m) => m.default)
      )
    )
    .use(initReactI18next);

  await i18n.init({
    ...i18nConfig,
    lng,
    ns: Array.isArray(ns) ? ns : [ns],
  });

  // Convenience: get a bound t() you can use directly in RSC
  const t = i18n.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns);
  return { i18n, t, lng };
}
