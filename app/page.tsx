import {
  AdjustmentsHorizontalIcon,
  ArrowRightIcon,
  BanknotesIcon,
  ChartBarIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

import { getServerI18n } from "./lib/i18n/server";
import LanguageSwitcher from "./ui/languageSwitcher";

// Icon mappings for pillar items
const iconMap = {
  "Forecast demand with clarity": ChartBarIcon,
  "Plan purchasing with precision": AdjustmentsHorizontalIcon,
  "Unlock working capital": BanknotesIcon,
} as const;

export default async function Home() {
  const { t, lng } = await getServerI18n("translation");

  // Build arrays from translations
  const pillars = [
    {
      title: t("pillars.items.0.title"),
      description: t("pillars.items.0.description"),
      icon: ChartBarIcon,
    },
    {
      title: t("pillars.items.1.title"),
      description: t("pillars.items.1.description"),
      icon: AdjustmentsHorizontalIcon,
    },
    {
      title: t("pillars.items.2.title"),
      description: t("pillars.items.2.description"),
      icon: BanknotesIcon,
    },
  ];

  const painPoints = [
    t("challenges.painPoints.0"),
    t("challenges.painPoints.1"),
    t("challenges.painPoints.2"),
  ];

  const positiveOutcomes = [
    t("challenges.positiveOutcomes.0"),
    t("challenges.positiveOutcomes.1"),
    t("challenges.positiveOutcomes.2"),
  ];

  const flowSteps = [
    {
      title: t("flow.steps.0.title"),
      description: t("flow.steps.0.description"),
    },
    {
      title: t("flow.steps.1.title"),
      description: t("flow.steps.1.description"),
    },
    {
      title: t("flow.steps.2.title"),
      description: t("flow.steps.2.description"),
    },
  ];

  const testimonials = [
    {
      quote: t("testimonials.items.0.quote"),
      name: t("testimonials.items.0.name"),
      role: t("testimonials.items.0.role"),
      company: t("testimonials.items.0.company"),
    },
    {
      quote: t("testimonials.items.1.quote"),
      name: t("testimonials.items.1.name"),
      role: t("testimonials.items.1.role"),
      company: t("testimonials.items.1.company"),
    },
    {
      quote: t("testimonials.items.2.quote"),
      name: t("testimonials.items.2.name"),
      role: t("testimonials.items.2.role"),
      company: t("testimonials.items.2.company"),
    },
  ];

  const metrics = [
    {
      value: t("metrics.items.0.value"),
      label: t("metrics.items.0.label"),
    },
    {
      value: t("metrics.items.1.value"),
      label: t("metrics.items.1.label"),
    },
    {
      value: t("metrics.items.2.value"),
      label: t("metrics.items.2.label"),
    },
  ];

  return (
    <main className="relative isolate overflow-hidden pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 -top-64 h-128 w-lg -translate-x-1/2 rounded-full bg-indigo-500/40 blur-[160px]" />
        <div className="absolute -bottom-72 -right-24 h-112 w-md rounded-full bg-sky-400/30 blur-[160px]" />
      </div>

      <section className="section-shell pt-24 md:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div>
            <div className="badge-soft mb-6">{t("target")}</div>
            <LanguageSwitcher />
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              {t("hero.headline")}
            </h1>
            <p className="mt-6 text-lg text-slate-300">
              {t("hero.subheadline")}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#book-demo"
                className="cta-primary inline-flex items-center justify-center px-6 py-3 text-base"
              >
                <span>{t("hero.ctaDemo")}</span>
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#product-video"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-white/40 hover:text-white"
              >
                <PlayCircleIcon className="h-5 w-5" />
                {t("hero.ctaWatch")}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                {t("hero.trustBadge1")}
              </span>
              <span className="inline-flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-indigo-400" />
                {t("hero.trustBadge2")}
              </span>
            </div>
          </div>

          <div id="product-video" className="relative">
            <div className="surface-glass relative overflow-hidden p-6">
              <div className="aspect-16/10 w-full rounded-2xl bg-linear-to-br from-slate-800/80 via-slate-900/60 to-slate-950/80 p-1">
                <div className="flex h-full w-full items-center justify-center rounded-[18px] border border-white/10 bg-slate-950/60">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/5">
                      <PlayCircleIcon className="h-10 w-10 text-indigo-300" />
                    </div>
                    <p className="max-w-sm text-sm text-slate-300">
                      {t("hero.videoPlaceholder")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/30 blur-[100px]" />
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-shell pt-24"
        aria-labelledby="planning-challenges"
      >
        <div className="surface-glass relative overflow-hidden p-10">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-linear-to-r from-indigo-500/10 to-transparent" />
          <div className="relative grid gap-10 md:grid-cols-2">
            <div>
              <h2
                id="planning-challenges"
                className="text-2xl font-semibold text-white md:text-3xl"
              >
                {t("challenges.title")}
              </h2>
              <p className="mt-4 text-base text-slate-300">
                {t("challenges.subtitle")}
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-rose-300/80">
                  {t("challenges.beforeLabel")}
                </p>
                <ul className="space-y-4 text-sm text-slate-200/80">
                  {painPoints.map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/15 text-rose-300">
                        <XCircleIcon className="h-4 w-4" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300/80">
                  {t("challenges.withLabel")}
                </p>
                <ul className="space-y-4 text-sm text-slate-200">
                  {positiveOutcomes.map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                        <CheckCircleIcon className="h-4 w-4" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-24" aria-labelledby="pillars">
        <div className="max-w-3xl">
          <h2
            id="pillars"
            className="text-3xl font-semibold text-white md:text-4xl"
          >
            {t("pillars.title")}
          </h2>
          <p className="mt-4 text-base text-slate-300">
            {t("pillars.subtitle")}
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="surface-glass flex h-full flex-col gap-4 p-8 transition duration-200 hover:border-white/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-200">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-300">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-shell pt-24" aria-labelledby="flow">
        <div className="surface-glass relative overflow-hidden px-10 py-12">
          <div className="absolute -top-20 right-0 h-52 w-52 rounded-full bg-sky-400/20 blur-[120px]" />
          <div className="relative">
            <h2
              id="flow"
              className="text-3xl font-semibold text-white md:text-4xl"
            >
              {t("flow.title")}
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-300">
              {t("flow.subtitle")}
            </p>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {flowSteps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.85)]"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-300">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-24" aria-labelledby="testimonials">
        <div className="max-w-2xl">
          <h2
            id="testimonials"
            className="text-3xl font-semibold text-white md:text-4xl"
          >
            {t("testimonials.title")}
          </h2>
          <p className="mt-4 text-base text-slate-300">
            {t("testimonials.subtitle")}
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="surface-glass flex h-full flex-col gap-6 p-8 transition duration-200 hover:border-white/40"
            >
              <blockquote className="text-sm text-slate-200">
                "{testimonial.quote}"
              </blockquote>
              <figcaption className="mt-auto text-sm text-slate-400">
                <div className="font-medium text-slate-200">
                  {testimonial.name}
                </div>
                <div>
                  {testimonial.role}, {testimonial.company}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section-shell pt-20" aria-labelledby="metrics">
        <div className="surface-glass flex flex-col gap-8 px-8 py-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-sm">
            <h2 id="metrics" className="text-2xl font-semibold text-white">
              {t("metrics.title")}
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              {t("metrics.subtitle")}
            </p>
          </div>
          <div className="grid w-full gap-6 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.value}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
              >
                <div className="text-3xl font-semibold text-white">
                  {metric.value}
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-indigo-200/80">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-24 pb-12" id="book-demo">
        <div className="surface-glass relative overflow-hidden px-8 py-12 text-center">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-indigo-500/20 to-transparent" />
          <div className="relative mx-auto max-w-2xl">
            <p className="badge-soft mb-6 inline-flex bg-white/5 text-indigo-100/90">
              {t("finalCta.badge")}
            </p>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              {t("finalCta.title")}
            </h2>
            <p className="mt-4 text-base text-slate-300">
              {t("finalCta.subtitle")}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                className="cta-primary inline-flex items-center px-6 py-3 text-base"
                href="mailto:hello@zuply8.com"
              >
                <span>{t("finalCta.cta")}</span>
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </a>
              <span className="text-sm text-slate-300">
                {t("finalCta.phone")}{" "}
                <span className="text-white">(555) 012-8890</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
