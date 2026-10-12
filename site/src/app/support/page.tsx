import { LifeBuoy, MessageCircleQuestion, Trash2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/home/sections";
import { Reveal, WordReveal } from "@/components/motion/reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Support" };

const CARDS = [
  { icon: MessageCircleQuestion, title: "Ask a question", text: "Open a support request on GitHub. Include your iPhone model and iOS version if something isn't working.", href: SITE.supportUrl, cta: "Open a request" },
  { icon: Trash2, title: "Delete your data", text: "In the app: Settings → Delete Account & Data. It erases everything on your device and your iCloud backup.", href: "/privacy/#retention-and-deletion", cta: "How deletion works" },
  { icon: LifeBuoy, title: "Read the rules", text: "The Privacy Policy and Terms explain exactly what Vestex does and doesn't do with your data.", href: "/privacy/", cta: "Privacy Policy" },
];

export default function Support() {
  return (
    <div className="wrap pt-12 md:pt-16">
      <p className="eyebrow mb-4">Help</p>
      <WordReveal as="h1" text="How can we help?" className="display block text-[clamp(40px,6vw,68px)] font-extrabold leading-[1.02]" />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {CARDS.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <Link href={c.href} className="card group block h-full p-6 transition-transform hover:-translate-y-1">
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-navy text-gold ring-1 ring-gold/20">
                <c.icon className="h-5 w-5" aria-hidden />
              </div>
              <h2 className="display text-xl font-bold">{c.title}</h2>
              <p className="mt-2 text-[15px] text-ink-soft">{c.text}</p>
              <p className="mt-4 text-sm font-semibold text-gold">
                {c.cta} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
      <h2 className="display mb-8 mt-20 text-3xl font-bold">Frequently asked</h2>
      <Faq />
    </div>
  );
}
