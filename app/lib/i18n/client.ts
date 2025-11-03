"use client";

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { i18nConfig } from "@/i18n";

function createClientI18n(lng: string) {
  const inst = i18next.createInstance();
  inst
    .use(
      resourcesToBackend((language: string, namespace: string) =>
        fetch(`/locale/${language}/${namespace}.json`).then((r) => r.json())
      )
    )
    .use(initReactI18next);
  return inst.init({ ...i18nConfig, lng });
}

export function I18nClientProvider({
  lng,
  children,
}: {
  lng: string;
  children: ReactNode;
}) {
  const ref = useRef<ReturnType<typeof createClientI18n>>();

  useEffect(() => {
    let mounted = true;
    createClientI18n(lng).then((inst) => {
      if (mounted) ref.current = inst as any;
    });
    return () => {
      mounted = false;
    };
  }, [lng]);

  if (!ref.current) return <>{children}</>;
  return <I18nextProvider i18n={ref.current}>{children}</I18nextProvider>;
}
