"use client";

import { motion } from "motion/react";
import { FloatingPaths } from "@/components/kokonutui/background-paths";
import { WordReveal } from "@/components/motion/reveal";
import { Phone } from "./phone";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Kokonut UI background paths, recoloured to navy and gold (one layer keeps it light on phones). */}
      <div className="absolute inset-0 -z-10 opacity-70">
        <FloatingPaths position={1} gradient={["rgba(232,180,74,0.55)", "rgba(77,140,245,0.45)", "rgba(47,191,113,0.35)"]} />
      </div>
      <div className="grid-bg absolute inset-0 -z-10" aria-hidden />
      <div className="absolute left-1/2 top-[-20%] -z-10 h-[620px] w-[920px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(232,180,74,0.16),transparent)]" aria-hidden />

      <div className="wrap grid items-center gap-14 pb-24 pt-14 md:grid-cols-[1.15fr_0.85fr] md:pt-20">
        <div>
          <motion.p className="eyebrow mb-5" {...fade(0)}>Stock market simulation · iPhone</motion.p>
          <h1 className="display text-[clamp(44px,7vw,84px)] font-extrabold leading-[0.98]">
            <WordReveal text="Learn to invest." className="block" />
            {/* Its own element: a clipped gradient doesn't reach transformed child spans. */}
            <motion.span
              className="block bg-gradient-to-r from-[#f6d58a] via-gold to-[#c98f1e] bg-clip-text pb-2 text-transparent"
              initial={{ opacity: 0, y: "0.3em", filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            >
              Risk-free.
            </motion.span>
          </h1>
          <motion.p className="mt-7 max-w-[46ch] text-lg leading-relaxed text-ink-soft" {...fade(0.5)}>
            Trade 99 stocks and ETFs in a realistic simulation with $10,000 in practice money. Learn as you go, then climb the
            leaderboard against five AI traders.
          </motion.p>
          <motion.div className="mt-9 flex flex-wrap items-center gap-4" {...fade(0.7)}>
            <span className="relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold px-6 py-3.5 font-semibold text-[#0e1a33]">
              <AppleLogo />
              Coming soon to the App Store
              <motion.span
                aria-hidden
                className="absolute inset-y-0 w-16 -skew-x-12 bg-white/40 blur-md"
                initial={{ x: -120 }}
                animate={{ x: 420 }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2.6, ease: "easeInOut" }}
              />
            </span>
            <a href="#features" className="group text-ink-soft transition-colors hover:text-ink">
              See what&apos;s inside <span className="inline-block transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
          </motion.div>
          <motion.p className="mt-5 text-sm text-ink-faint" {...fade(0.85)}>
            Free. No ads. No real money, no real trading.
          </motion.p>
        </div>
        <div className="mx-auto w-[min(300px,76vw)]">
          <Phone />
        </div>
      </div>
    </section>
  );
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 17 20" className="h-[18px] w-[15px] fill-current" aria-hidden>
      <path d="M14.1 10.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.5 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4zM11.6 3c.7-.9 1.2-2 1-3.2-1 .1-2.2.7-2.9 1.6-.6.7-1.2 1.9-1 3.1 1.1.1 2.2-.6 2.9-1.5z" />
    </svg>
  );
}
