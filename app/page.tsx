import {
  AdjustmentsHorizontalIcon,
  ArrowRightIcon,
  BanknotesIcon,
  ChartBarIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const pillars = [
  {
    title: "Forecast demand with clarity",
    description:
      "Blend historical patterns, seasonality, and promotions so every planning cycle starts with a confident demand signal.",
    icon: ChartBarIcon,
  },
  {
    title: "Plan purchasing with precision",
    description:
      "Translate demand into smart order recommendations that respect supplier lead times, pack sizes, and service targets.",
    icon: AdjustmentsHorizontalIcon,
  },
  {
    title: "Unlock working capital",
    description:
      "Keep critical SKUs in stock while trimming excess on slow movers to free cash and reinvest in growth initiatives.",
    icon: BanknotesIcon,
  },
] satisfies {
  title: string;
  description: string;
  icon: typeof ChartBarIcon;
}[];

const painPoints = [
  "Hours lost every week wrestling with spreadsheets and stale data.",
  "Guesswork on what to replenish first, leading to costly stockouts.",
  "Inventory bloated with products that aren’t moving fast enough.",
];

const positiveOutcomes = [
  "A single reliable view of demand and purchasing priorities.",
  "Confidence that the right SKUs stay available for key accounts.",
  "Working capital freed up to fuel merchandising and growth.",
];

const flowSteps = [
  {
    title: "Segment what matters",
    description:
      "Identify the SKUs that drive revenue, margin, or customer promises so the team knows where to focus first.",
  },
  {
    title: "Model forward scenarios",
    description:
      "Preview how demand shifts, supplier changes, or new launches will impact inventory weeks before decisions are due.",
  },
  {
    title: "Act with agility",
    description:
      "Turn plans into purchase orders, allocation moves, and replenishment tasks that keep operations nimble and resilient.",
  },
];

const testimonials = [
  {
    quote:
      "Zuply8 gave us the clarity to reorder in hours instead of days. Stockouts on priority lines dropped almost immediately.",
    name: "Isabella Chen",
    role: "VP Operations",
    company: "UrbanCart Wholesale",
  },
  {
    quote:
      "We now plan demand and purchases in the same workspace. The team trusts the numbers, and our buyers stay ahead of changes.",
    name: "Miguel Santos",
    role: "Director of Supply Chain",
    company: "MercadoNova Retail Group",
  },
  {
    quote:
      "The visibility into cash tied up in slow movers let us rebalance inventory without hurting service levels.",
    name: "Lydia Alvarez",
    role: "Inventory Planning Lead",
    company: "NorthPeak Outfitters",
  },
];

const metrics = [
  {
    value: "30%",
    label: "Less time spent assembling purchase orders",
  },
  {
    value: "25%",
    label: "Reduction in stockouts across critical SKUs",
  },
  {
    value: "18%",
    label: "Inventory cash freed within the first quarter",
  },
];

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-16rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-indigo-500/40 blur-[160px]" />
        <div className="absolute bottom-[-18rem] right-[-6rem] h-[28rem] w-[28rem] rounded-full bg-sky-400/30 blur-[160px]" />
      </div>

      <section className="section-shell pt-24 md:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div>
            <div className="badge-soft mb-6">
              Advanced planning for wholesalers & retailers
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Know what to buy, when to buy it, and how it fuels your next
              quarter.
            </h1>
            <p className="mt-6 text-lg text-slate-300">
              Zuply8 brings purchasing, demand, and inventory planning into one
              advanced workspace. See how your business will evolve, keep
              priority items ready, and release cash from what can wait.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#book-demo"
                className="cta-primary inline-flex items-center justify-center px-6 py-3 text-base"
              >
                <span>Book a demo</span>
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#product-video"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-white/40 hover:text-white"
              >
                <PlayCircleIcon className="h-5 w-5" />
                Watch how Zuply8 works
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                Trusted by modern planning teams
              </span>
              <span className="inline-flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-indigo-400" />
                Built for complex SKU portfolios
              </span>
            </div>
          </div>

          <div id="product-video" className="relative">
            <div className="surface-glass relative overflow-hidden p-6">
              <div className="aspect-[16/10] w-full rounded-2xl bg-gradient-to-br from-slate-800/80 via-slate-900/60 to-slate-950/80 p-1">
                <div className="flex h-full w-full items-center justify-center rounded-[18px] border border-white/10 bg-slate-950/60">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/5">
                      <PlayCircleIcon className="h-10 w-10 text-indigo-300" />
                    </div>
                    <p className="max-w-sm text-sm text-slate-300">
                      Product walkthrough video coming soon. Request a demo to
                      see Zuply8 in action.
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
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-indigo-500/10 to-transparent" />
          <div className="relative grid gap-10 md:grid-cols-2">
            <div>
              <h2
                id="planning-challenges"
                className="text-2xl font-semibold text-white md:text-3xl"
              >
                Trade messy planning cycles for foresight and control.
              </h2>
              <p className="mt-4 text-base text-slate-300">
                Zuply8 focuses on the realities wholesalers and retailers
                navigate daily: service commitments, supplier constraints, and
                dynamic demand.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-rose-300/80">
                  Before Zuply8
                </p>
                <ul className="space-y-4 text-sm text-slate-200/80">
                  {painPoints.map((item) => (
                    <li key={item} className="flex gap-3">
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
                  With Zuply8
                </p>
                <ul className="space-y-4 text-sm text-slate-200">
                  {positiveOutcomes.map((item) => (
                    <li key={item} className="flex gap-3">
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
            The advanced planning cockpit your team can rely on.
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Zuply8 aligns demand signals with smart purchasing recommendations
            so your planners spend less time reconciling data and more time
            driving growth.
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
              Plan the right mix every cycle.
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-300">
              Connect demand visibility with purchasing execution. Zuply8 gives
              you the guardrails to protect service levels while dynamically
              managing inventory.
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
            Teams trust Zuply8 to keep them ready for every demand shift.
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Hear how wholesalers and retailers are unlocking service level
            confidence while freeing up working capital.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="surface-glass flex h-full flex-col gap-6 p-8 transition duration-200 hover:border-white/40"
            >
              <blockquote className="text-sm text-slate-200">
                “{testimonial.quote}”
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
              Outcomes you can measure in the first 12 weeks.
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Zuply8 helps teams turn plans into action without sacrificing
              service.
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
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-indigo-500/20 to-transparent" />
          <div className="relative mx-auto max-w-2xl">
            <p className="badge-soft mb-6 inline-flex bg-white/5 text-indigo-100/90">
              Ready to modernize your planning cycle?
            </p>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Book a demo and see how Zuply8 aligns purchasing with demand.
            </h2>
            <p className="mt-4 text-base text-slate-300">
              We’ll tailor the walkthrough to your categories, supplier mix, and
              planning cadence so you can act with agility.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                className="cta-primary inline-flex items-center px-6 py-3 text-base"
                href="mailto:hello@zuply8.com"
              >
                <span>Book a demo</span>
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </a>
              <span className="text-sm text-slate-300">
                Prefer to talk now? Call us at{" "}
                <span className="text-white">(555) 012-8890</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
