import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { headers, cookies } from "next/headers";
import { i18nConfig, defaultNS, supportedLngs, fallbackLng } from "@/i18n";

async function detectLng(): Promise<string> {
  const c = (await cookies()).get("lng")?.value;
  if (c && (supportedLngs as readonly string[]).includes(c)) return c;
  const accept = (await headers()).get("accept-language") ?? "";
  const pref = accept.split(",")[0]?.split("-")[0];
  if (pref && (supportedLngs as readonly string[]).includes(pref)) return pref;
  return fallbackLng;
}

async function getOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

export async function getServerI18n(ns: string | string[] = defaultNS) {
  const lng = await detectLng();
  const origin = await getOrigin();

  const i18n = createInstance();

  i18n
    .use(
      resourcesToBackend((language: string, namespace: string) =>
        fetch(`${origin}/locale/${language}/${namespace}.json`, {
          // avoid caching in dev; keep default in prod if you like
          cache:
            process.env.NODE_ENV === "development" ? "no-store" : "default",
        }).then((r) => r.json())
      )
    )
    .use(initReactI18next);

  await i18n.init({
    ...i18nConfig,
    lng,
    ns: Array.isArray(ns) ? ns : [ns],
  });

  const t = i18n.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns);
  return { i18n, t, lng };
}
