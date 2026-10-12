"use client";

import { CalendarRange, ChartCandlestick, GraduationCap, LayoutGrid, Shield, Trophy } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { MouseEvent, ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: ChartCandlestick,
    tag: "Trade",
    title: "Any amount, even $5",
    text: "Fractional shares by dollar amount or whole shares. Market, limit, stop, stop-limit and trailing stop orders, good for the day or until canceled. Dividend stocks pay cash dividends.",
    span: "md:col-span-2",
  },
  {
    icon: Shield,
    tag: "Advanced",
    title: "Shorting and options",
    text: "Short selling with collateral rules and margin calls, plus calls and puts priced with Black-Scholes. Lessons unlock them as you go.",
    span: "",
  },
  {
    icon: GraduationCap,
    tag: "Learn",
    title: "Lessons and a trade coach",
    text: "Short lessons with quizzes, a glossary, an explanation beside every control, and a coach that reviews your trades.",
    span: "",
  },
  {
    icon: Trophy,
    tag: "Compete",
    title: "One leaderboard, five AI traders",
    text: "A Game Center leaderboard ranks total return since your portfolio started. Beat five AI traders, earn a skill rating and play in seasons.",
    span: "md:col-span-2",
  },
  {
    icon: LayoutGrid,
    tag: "Track",
    title: "Portfolio, widgets, sharing",
    text: "Performance against the S&P 500, trade history, price alerts, model portfolios, Home and Lock Screen widgets and share cards.",
    span: "md:col-span-2",
  },
  {
    icon: CalendarRange,
    tag: "Stay",
    title: "Streaks and weekend practice",
    text: "Achievements, daily streaks and a separate practice market on weekends, when the main market is closed.",
    span: "",
  },
];

export function Features() {
  return (
    <section id="features" className="wrap scroll-mt-24 py-24">
      <Reveal>
        <p className="eyebrow mb-4">Features</p>
        <h2 className="display max-w-[18ch] text-[clamp(32px,4.6vw,52px)] font-bold leading-[1.05]">
          Pro-level tools. Zero real risk.
        </h2>
        <p className="mt-4 max-w-[60ch] text-lg text-ink-soft">
          The tools usually locked behind a premium plan, free from the first trade.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={(i % 3) * 0.08} className={f.span}>
            <SpotlightCard>
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-navy text-gold ring-1 ring-gold/20">
                <f.icon className="h-5 w-5" aria-hidden />
              </div>
              <p className="eyebrow !text-[11px]">{f.tag}</p>
              <h3 className="display mt-1.5 text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{f.text}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/** A card with a soft gold glow that follows the pointer. */
function SpotlightCard({ children, className }: { children: ReactNode; className?: string }) {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const glow = useMotionTemplate`radial-gradient(380px circle at ${x}px ${y}px, rgba(232,180,74,0.13), transparent 70%)`;
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };
  return (
    <motion.div
      onMouseMove={move}
      onMouseLeave={() => { x.set(-400); y.set(-400); }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn("card group relative h-full overflow-hidden p-6", className)}
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: glow }} aria-hidden />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
