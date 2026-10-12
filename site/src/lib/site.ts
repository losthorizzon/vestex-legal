/** Shared site facts. Kept in one place so every page says the same thing. */
export const SITE = {
  name: "Vestex",
  tagline: "Learn to invest. Risk-free.",
  description:
    "Vestex for iPhone: a realistic stock market simulation. Trade 99 stocks and ETFs with $10,000 in practice money, learn as you go and climb the leaderboard.",
  appStoreUrl: "https://apps.apple.com/app/id6821571769",
  supportUrl: "https://github.com/losthorizzon/vestex-legal/issues",
  developer: "Vladimir Bessonov",
};

/** Prefixes a public file path with the GitHub Pages base path. */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
