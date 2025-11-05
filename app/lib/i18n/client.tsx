"use client";

import React from "react";
import { I18nextProvider } from "react-i18next";
import i18next, { type i18n } from "i18next";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
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
  const [i18nInstance, setI18nInstance] = useState<i18n | null>(null);

  useEffect(() => {
    let mounted = true;
    const inst = i18next.createInstance();
    inst
      .use(
        resourcesToBackend((language: string, namespace: string) =>
          fetch(`/locale/${language}/${namespace}.json`).then((r) => r.json())
        )
      )
      .use(initReactI18next);

    inst.init({ ...i18nConfig, lng }).then(() => {
      if (mounted) {
        setI18nInstance(inst);
      }
    });

    return () => {
      mounted = false;
    };
  }, [lng]);

  // Create a default instance immediately to ensure provider always has a valid i18n
  // This instance will be replaced once the async one is ready
  const [defaultInstance] = useState(() => {
    const inst = i18next.createInstance();
    inst.use(initReactI18next);
    // Initialize with minimal config - will be replaced by real instance
    void inst.init({ ...i18nConfig, lng, resources: {} });
    return inst;
  });

  return (
    <I18nextProvider i18n={i18nInstance || defaultInstance}>
      {children}
    </I18nextProvider>
  );
}
