"use client";

import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { asset } from "@/lib/site";

// MARK: Stats

const STATS = [
  { value: 10000, prefix: "$", label: "simulated starting cash" },
  { value: 99, label: "US stocks and ETFs" },
  { value: 5, label: "AI traders to beat" },
  { value: 10, suffix: " s", label: "between price updates while open" },
];

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <section className="wrap py-10">
      <div ref={ref} className="card grid grid-cols-2 overflow-hidden md:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.label} className={`p-6 md:p-8 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b md:border-b-0" : ""} md:border-r border-rule last:border-r-0`}>
            <p className="display tabular text-[clamp(28px,4vw,44px)] font-bold">
              {s.prefix}
              <NumberFlow value={inView ? s.value : 0} format={{ useGrouping: true }} transformTiming={{ duration: 1400, easing: "cubic-bezier(0.22,1,0.36,1)" }} />
              {s.suffix}
            </p>
            <p className="mt-1 text-sm text-ink-soft">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// MARK: How it works

const STEPS = [
  { n: "01", title: "Start with $10,000", text: "Practice money, never real. Pick your experience level and Vestex sets how much guidance you get." },
  { n: "02", title: "Trade a live-feeling market", text: "A realistic simulation open Monday to Friday, 9:30 AM–4:00 PM Eastern, ticking every 10 seconds. Weekends have their own practice market." },
  { n: "03", title: "Learn, then level up", text: "Lessons unlock options, short selling and advanced orders. The coach reviews your trades; the leaderboard ranks your total return." },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section id="how" className="wrap scroll-mt-24 py-24">
      <Reveal>
        <p className="eyebrow mb-4">How it works</p>
        <h2 className="display max-w-[20ch] text-[clamp(32px,4.6vw,52px)] font-bold leading-[1.05]">Real market mechanics. Simulated money.</h2>
      </Reveal>
      <div ref={ref} className="relative mt-14 grid gap-10 pl-10 md:pl-14">
        <div className="absolute bottom-2 left-[11px] top-2 w-px bg-rule md:left-[19px]" aria-hidden />
        <motion.div style={{ height }} className="absolute left-[11px] top-2 w-px bg-gradient-to-b from-gold to-up md:left-[19px]" aria-hidden />
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.06} className="relative">
            <span className="absolute -left-10 top-1 grid h-6 w-6 place-items-center rounded-full border border-gold/50 bg-background md:-left-14 md:h-10 md:w-10">
              <span className="h-2 w-2 rounded-full bg-gold md:h-2.5 md:w-2.5" />
            </span>
            <p className="font-mono text-sm text-gold">{s.n}</p>
            <h3 className="display mt-1 text-2xl font-bold">{s.title}</h3>
            <p className="mt-2 max-w-[60ch] text-ink-soft">{s.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// MARK: Screens gallery

const GALLERY = [
  { src: "/screens/welcome.jpg", label: "Welcome" },
  { src: "/screens/explore.jpg", label: "Explore" },
  { src: "/screens/stock-detail.jpg", label: "Stock page" },
  { src: "/screens/portfolio.jpg", label: "Portfolio" },
  { src: "/screens/leaderboard.jpg", label: "Leaderboard" },
  { src: "/screens/learn.jpg", label: "Learn" },
  { src: "/screens/alerts.jpg", label: "Alerts" },
];

export function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-28%"]);
  return (
    <section ref={ref} className="overflow-hidden py-24">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow mb-4">Inside the app</p>
          <h2 className="display text-[clamp(32px,4.6vw,52px)] font-bold leading-[1.05]">Designed like a real brokerage app.</h2>
        </Reveal>
      </div>
      <motion.div style={{ x }} className="mt-12 flex w-max gap-6 pl-[max(20px,calc((100vw-1140px)/2+20px))]">
        {GALLERY.map((g) => (
          <figure key={g.src} className="w-[200px] shrink-0 md:w-[240px]">
            <motion.img
              src={asset(g.src)}
              alt={`Vestex ${g.label} screen`}
              loading="lazy"
              whileHover={{ y: -8, rotate: -1 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="aspect-[660/1434] w-full rounded-[28px] border border-white/10 object-cover shadow-[0_24px_50px_-18px_rgba(0,0,0,0.6)]"
            />
            <figcaption className="mt-3 text-center text-sm text-ink-faint">{g.label}</figcaption>
          </figure>
        ))}
      </motion.div>
    </section>
  );
}

// MARK: FAQ

export const FAQS = [
  { q: "Is any real money involved?", a: "No. Every balance, order and position is simulated. Nothing you do in Vestex can cost or earn real money." },
  { q: "Are the prices live?", a: "No. Prices come from a realistic market simulation that moves the way real markets do. They are not live quotes, and nothing in Vestex is investment advice." },
  { q: "Why didn't my order fill?", a: "The market is open Monday to Friday, 9:30 AM–4:00 PM Eastern. Orders placed while it's closed wait for the next open, and limit and stop orders wait for their price. An order that can't be paid for when it triggers is cancelled." },
  { q: "Do I need an account?", a: "No. Signing in with Apple is optional. It asks only for your name and backs up your portfolio to your own private iCloud, which the developer cannot read." },
  { q: "Can I start over?", a: "Yes, if you want to. Settings → Reset Portfolio becomes available six months after your portfolio starts, and every six months after that. Successful players can keep the same portfolio for as long as they like." },
  { q: "How do I delete my data?", a: "Settings → Delete Account & Data permanently erases everything on your device and your iCloud backup. Scores already sent to Game Center stay with Apple." },
  { q: "Why is my new portfolio missing from the leaderboard?", a: "Each Game Center player has one portfolio on the leaderboard. After Delete Account & Data, a new portfolio's scores are held back until your previous portfolio's six-month reset date." },
];

export function Faq({ items = FAQS }: { items?: typeof FAQS }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-rule overflow-hidden rounded-3xl border border-rule">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="bg-surface/60">
            <button
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="display text-lg font-semibold">{f.q}</span>
              <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="text-2xl leading-none text-gold" aria-hidden>+</motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[70ch] px-6 pb-6 text-ink-soft">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// MARK: Closing call to action

export function ClosingCta() {
  return (
    <section className="wrap py-16">
      <Reveal className="relative overflow-hidden rounded-[32px] border border-gold/25 bg-gradient-to-br from-navy to-[#0b1430] px-8 py-16 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_50%_0%,rgba(232,180,74,0.22),transparent)]" aria-hidden />
        <div className="relative">
          <img src={asset("/logo.png")} alt="" width={64} height={64} className="mx-auto rounded-2xl shadow-lg" />
          <h2 className="display mx-auto mt-6 max-w-[16ch] text-[clamp(32px,5vw,56px)] font-bold leading-[1.02] text-white">
            Practice with $10,000. Risk nothing.
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-lg text-[#aab6d3]">Coming soon to the App Store for iPhone. Free, no ads, no real money.</p>
        </div>
      </Reveal>
    </section>
  );
}
