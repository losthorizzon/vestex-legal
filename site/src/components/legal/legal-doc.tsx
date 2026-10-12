"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { Reveal, WordReveal } from "@/components/motion/reveal";

export type LegalArticle = { title: string; clauses: string[] };

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** A legal document: reading-progress bar, sticky contents with the current
 *  section highlighted, and numbered articles. */
export function LegalDoc({
  title,
  effective,
  summary,
  articles,
  extra = [],
}: {
  title: string;
  effective: string;
  summary: string[];
  articles: LegalArticle[];
  extra?: LegalArticle[];
}) {
  const all = useMemo(() => [...articles, ...extra], [articles, extra]);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const [active, setActive] = useState(slug(all[0]?.title ?? ""));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-30% 0px -60% 0px" },
    );
    all.forEach((a) => {
      const el = document.getElementById(slug(a.title));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [all]);

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-gold to-up" aria-hidden />
      <div className="wrap pb-10 pt-12 md:pt-16">
        <p className="eyebrow mb-4">Vestex for iPhone</p>
        <WordReveal as="h1" text={title} className="display block text-[clamp(40px,6vw,68px)] font-extrabold leading-[1.02]" />
        <p className="mt-4 font-mono text-sm text-ink-faint">Effective {effective}</p>
        <Reveal className="card mt-10 p-6 md:p-8" delay={0.2}>
          <p className="eyebrow mb-4">In short</p>
          <ul className="grid gap-3 text-ink-soft md:grid-cols-2">
            {summary.map((s) => (
              <li key={s} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <div className="wrap grid gap-12 md:grid-cols-[220px_minmax(0,1fr)]">
        <nav aria-label="Contents" className="hidden md:block">
          <div className="sticky top-28 grid max-h-[calc(100vh-140px)] gap-1 overflow-auto pr-2 text-sm">
            {all.map((a, i) => {
              const id = slug(a.title);
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`relative rounded-lg px-3 py-1.5 transition-colors ${active === id ? "text-ink" : "text-ink-faint hover:text-ink-soft"}`}
                >
                  {active === id && (
                    <motion.span layoutId="toc-active" className="absolute inset-0 -z-10 rounded-lg bg-surface-2" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                  )}
                  <span className="mr-2 font-mono text-xs text-gold/80">{String(i + 1).padStart(2, "0")}</span>
                  {a.title}
                </a>
              );
            })}
          </div>
        </nav>
        <article className="legal-prose min-w-0">
          {all.map((a, i) => (
            <Reveal key={a.title} as="section" className="border-t border-rule py-8 first:border-t-0 first:pt-0">
              <h2 id={slug(a.title)} className="display mb-4 text-2xl font-bold">
                <span className="mr-3 font-mono text-base text-gold">{String(i + 1).padStart(2, "0")}</span>
                {a.title}
              </h2>
              {a.clauses.map((c, j) => (
                <p key={j}>{c}</p>
              ))}
            </Reveal>
          ))}
        </article>
      </div>
    </>
  );
}
