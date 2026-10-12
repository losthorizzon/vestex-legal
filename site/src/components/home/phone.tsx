"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { asset } from "@/lib/site";

const SCREENS = [
  { src: "/screens/explore.jpg", alt: "Explore: SPY chart, ETFs and today's top movers" },
  { src: "/screens/stock-detail.jpg", alt: "A stock page with a live intraday chart and key stats" },
  { src: "/screens/leaderboard.jpg", alt: "The leaderboard with five AI traders" },
  { src: "/screens/learn.jpg", alt: "Lessons, achievements and the glossary" },
  { src: "/screens/alerts.jpg", alt: "Market-open, price and streak notifications" },
];

/** An iPhone frame cycling through real app screens, tilting gently. */
export function Phone({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SCREENS.length), 3200);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className={`relative ${className}`}>
      <motion.div
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative aspect-[660/1434] w-full rounded-[44px] border border-white/15 bg-[#05080f] p-[9px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.65),0_0_0_1px_rgba(232,180,74,0.08)]"
      >
        <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-black">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.img
              key={SCREENS[index].src}
              src={asset(SCREENS[index].src)}
              alt={SCREENS[index].alt}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
        </div>
      </motion.div>
      <div className="mt-5 flex justify-center gap-1.5" aria-hidden>
        {SCREENS.map((s, i) => (
          <motion.span
            key={s.src}
            className="h-1.5 rounded-full bg-ink-faint/40"
            animate={{ width: i === index ? 22 : 6, backgroundColor: i === index ? "var(--gold)" : "rgba(120,134,168,0.4)" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        ))}
      </div>
    </div>
  );
}
