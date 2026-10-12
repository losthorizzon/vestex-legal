"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { asset } from "@/lib/site";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#how", label: "How it works" },
  { href: "/privacy/", label: "Privacy" },
  { href: "/terms/", label: "Terms" },
  { href: "/support/", label: "Support" },
];

/** A floating glass bar that tightens once the page scrolls. */
export function SiteHeader() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));
  const path = usePathname();

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 pt-[max(env(safe-area-inset-top),12px)]"
    >
      <div className="wrap">
        <nav
          aria-label="Main"
          className={cn(
            "flex items-center justify-between gap-3 rounded-full border px-3 py-2 transition-all duration-300",
            scrolled
              ? "border-rule bg-[color-mix(in_srgb,var(--surface)_72%,transparent)] shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <Link href="/" className="flex items-center gap-2.5 rounded-full pr-2 text-[19px] font-bold display">
            <img src={asset("/logo.png")} alt="" width={30} height={30} className="rounded-[7px]" />
            Vestex
          </Link>
          <div className="flex min-w-0 gap-1 overflow-x-auto [scrollbar-width:none]">
            {LINKS.map((l) => {
              const active = l.href.startsWith("/") && !l.href.includes("#") && path?.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                    active ? "bg-surface-2 text-ink" : "text-ink-soft hover:bg-surface-2 hover:text-ink",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
