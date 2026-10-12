"use client";

import NumberFlow from "@number-flow/react";
import { useInView } from "motion/react";
import { useMemo, useRef } from "react";
import { Area, AreaChart } from "@/components/charts/area-chart";
import { Grid } from "@/components/charts/grid";
import { ChartTooltip } from "@/components/charts/tooltip";
import { XAxis } from "@/components/charts/x-axis";
import { Reveal } from "@/components/motion/reveal";

/** A deterministic, made-up six-month path for the illustration. */
function illustrativeSeries() {
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) - 0.5;
  const out: { date: Date; you: number; market: number }[] = [];
  let you = 10000, market = 10000;
  const start = new Date(2026, 3, 1);
  for (let d = 0; d < 126; d++) {
    market *= 1 + 0.0004 + rand() * 0.016;
    you *= 1 + 0.0009 + rand() * 0.022;
    const date = new Date(start);
    date.setDate(start.getDate() + Math.floor(d * 1.45));
    out.push({ date, you: Math.round(you * 100) / 100, market: Math.round(market * 100) / 100 });
  }
  return out;
}

const usd = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function ChartShowcase() {
  const data = useMemo(illustrativeSeries, []);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const last = data[data.length - 1];
  const youReturn = last.you / 10000 - 1;
  const marketReturn = last.market / 10000 - 1;

  return (
    <section className="wrap py-24">
      <div className="grid items-center gap-12 md:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <p className="eyebrow mb-4">Track</p>
          <h2 className="display text-[clamp(32px,4.6vw,52px)] font-bold leading-[1.05]">Beat the market. Or learn why you didn&apos;t.</h2>
          <p className="mt-4 max-w-[48ch] text-lg text-ink-soft">
            Every portfolio is measured against the S&amp;P 500, session by session, with drawdowns, win rate and a weekly report card.
          </p>
          <div ref={ref} className="mt-8 grid grid-cols-2 gap-3">
            <div className="card p-5">
              <p className="text-sm text-ink-faint">You</p>
              <NumberFlow
                className="display tabular text-3xl font-bold text-up"
                value={inView ? youReturn : 0}
                format={{ style: "percent", maximumFractionDigits: 1, signDisplay: "always" }}
              />
            </div>
            <div className="card p-5">
              <p className="text-sm text-ink-faint">S&amp;P 500</p>
              <NumberFlow
                className="display tabular text-3xl font-bold text-ink-soft"
                value={inView ? marketReturn : 0}
                format={{ style: "percent", maximumFractionDigits: 1, signDisplay: "always" }}
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-ink-faint">Illustrative example, not real results.</p>
        </Reveal>
        <Reveal delay={0.1} className="card relative h-[360px] overflow-hidden p-2 md:h-[420px]">
          {inView && (
            <AreaChart data={data} aspectRatio={undefined} margin={{ top: 24, right: 16, bottom: 36, left: 16 }} className="h-full w-full">
              <Grid strokeDasharray="3,6" />
              <Area dataKey="market" fill="var(--ink-faint)" stroke="var(--ink-faint)" fillOpacity={0.08} strokeWidth={1.6} />
              <Area dataKey="you" fill="var(--up)" stroke="var(--up)" fillOpacity={0.25} strokeWidth={2.4} />
              <XAxis numTicks={4} />
              <ChartTooltip
                rows={(point) => [
                  { color: "var(--up)", label: "You", value: usd(point.you as number) },
                  { color: "var(--ink-faint)", label: "S&P 500", value: usd(point.market as number) },
                ]}
              />
            </AreaChart>
          )}
        </Reveal>
      </div>
    </section>
  );
}
