import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree, JetBrains_Mono } from "next/font/google";
import { MotionProviders } from "@/components/motion/providers";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SITE, asset } from "@/lib/site";
import "./globals.css";

// Fonts are downloaded at build time and served from this site, so a visit
// makes no request to Google.
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin", "latin-ext"], weight: ["600", "700", "800"] });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin", "latin-ext"], weight: ["400", "500", "600"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["500"] });

export const metadata: Metadata = {
  title: { default: `${SITE.name} — Realistic Stock Market Simulation`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  icons: {
    icon: [
      { url: asset("/favicon-32.png"), sizes: "32x32", type: "image/png" },
      { url: asset("/favicon-192.png"), sizes: "192x192", type: "image/png" },
    ],
    apple: asset("/apple-touch-icon.png"),
  },
  other: { "apple-itunes-app": "app-id=6821571769" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070d1c" },
    { media: "(prefers-color-scheme: light)", color: "#f5f6fa" },
  ],
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${figtree.variable} ${jetbrains.variable}`}>
      <head>
        {/* Entrance animations start hidden; without JavaScript show everything. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <MotionProviders>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </MotionProviders>
      </body>
    </html>
  );
}
