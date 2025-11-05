import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { supportedLngs, fallbackLng } from "@/i18n";

async function detectLng(): Promise<string> {
  const c = (await cookies()).get("lng")?.value;
  if (c && (supportedLngs as readonly string[]).includes(c)) return c;
  const accept = (await headers()).get("accept-language") ?? "";
  const pref = accept.split(",")[0]?.split("-")[0];
  if (pref && (supportedLngs as readonly string[]).includes(pref)) return pref;
  return fallbackLng;
}

export default async function RootPage() {
  const lng = await detectLng();
  redirect(`/${lng}`);
}
