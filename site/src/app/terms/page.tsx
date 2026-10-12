import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal/legal-doc";
import legal from "@/data/legal.json";

export const metadata: Metadata = { title: "Terms of Service" };

const WEBSITE = [
  {
    title: "This Website",
    clauses: [
      "This website describes the Application and publishes its legal documents and support information. Its content is provided for information only, may change without notice, and is not investment advice. The disclaimers and limitations of liability in these Terms apply to the website as they do to the Application.",
      "Screenshots on this website show the Application with simulated data; figures and charts on the website are illustrations, not real or expected results. Links to third-party sites, including Apple, GitHub and data providers, are provided for convenience; the developer is not responsible for their content.",
    ],
  },
];

export default function Terms() {
  return (
    <LegalDoc
      title="Terms of Service"
      effective={legal.terms.effective}
      summary={[
        "Vestex is an educational simulation. No real money, securities or trades are involved.",
        "Nothing in the app or on this site is investment advice. Results are hypothetical.",
        "You must be 13 or older to use the app.",
        "Don't tamper with saved data or the clock, or fake leaderboard scores.",
        "Company names, tickers, logos and Pexels photographs belong to their owners and imply no endorsement.",
        "The app is provided as is, to the extent the law allows.",
      ]}
      articles={legal.terms.articles}
      extra={WEBSITE}
    />
  );
}
