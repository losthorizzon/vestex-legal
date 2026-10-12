import type { NextConfig } from "next";

// Published to GitHub Pages under https://losthorizzon.github.io/vestex-legal/
// as plain static files. `npm run publish` builds with that prefix and copies
// the result to the repository root; `npm run dev` runs without it.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
