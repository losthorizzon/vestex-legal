import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal/legal-doc";
import legal from "@/data/legal.json";

export const metadata: Metadata = { title: "Privacy Policy" };

// The app's Privacy Policy, word for word (copied from the app by
// scripts/extract-legal.py), followed by the part that covers this website.
const WEBSITE = [
  {
    title: "This Website",
    clauses: [
      "This website is a static site hosted on GitHub Pages, a service of GitHub, Inc. It uses no cookies, no analytics, no advertising and no tracking. Fonts and images are served from this site, so a visit makes no request to Google, Pexels or any other third party.",
      "As with any website, GitHub's servers receive your IP address and basic request information (such as your browser type and the page requested) in order to deliver the pages, and may keep it in server logs for security purposes, under the GitHub General Privacy Statement. The developer does not receive or have access to these logs.",
      "Support requests are made through GitHub Issues. Anything you post there is public and is handled by GitHub under its own terms and privacy statement. Do not post personal information in a support request.",
    ],
  },
];

export default function Privacy() {
  return (
    <LegalDoc
      title="Privacy Policy"
      effective={legal.privacy.effective}
      summary={[
        "No developer servers. The developer collects no personal data, identifiers, location, contacts or analytics. No ads, no trackers.",
        "Sign in with Apple is optional and asks only for your name, kept on your device.",
        "Your iCloud backup is sealed in your own private CloudKit database. The developer cannot read it.",
        "Game Center is optional and run by Apple. Your alias, return and rating tier are visible to other players.",
        "The one photograph in the app (from Pexels) is bundled with it. Showing it contacts no one.",
        "Delete Account & Data in Settings erases everything on your device and your iCloud backup.",
      ]}
      articles={legal.privacy.articles}
      extra={WEBSITE}
    />
  );
}
