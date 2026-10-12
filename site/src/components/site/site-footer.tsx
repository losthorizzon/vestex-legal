import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="wrap grid gap-8 py-12 text-sm text-ink-faint md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="display text-lg font-bold text-ink">Vestex</p>
          <p className="max-w-md">
            A realistic stock market simulation for learning to invest. Results are hypothetical. No transaction carries real
            monetary value. Not investment advice.
          </p>
          <p>© 2026 Vestex · Developed by {SITE.developer}</p>
        </div>
        <div className="space-y-2">
          <p className="eyebrow !text-ink-faint">Legal</p>
          <Link className="block hover:text-ink" href="/privacy/">Privacy Policy</Link>
          <Link className="block hover:text-ink" href="/terms/">Terms of Service</Link>
          <Link className="block hover:text-ink" href="/support/">Support</Link>
        </div>
        <div className="space-y-2">
          <p className="eyebrow !text-ink-faint">Credits</p>
          <p>
            Market data: HF Data Library (Elkassabgi 2026), CC BY 4.0, modified. Data provided for free by IEX; use of IEX
            Historical Data is subject to the IEX Historical Data Terms of Use.
          </p>
          <p>Onboarding photograph: Pexels, under the Pexels License.</p>
        </div>
      </div>
    </footer>
  );
}
