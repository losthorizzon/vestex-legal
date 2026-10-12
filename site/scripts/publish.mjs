// Builds the site for GitHub Pages and copies it into the repository root
// (one level up), which is what Pages serves. Old build files are replaced;
// the repository's own files (README, .git, site/) are left alone.
import { execSync } from "node:child_process";
import { cpSync, existsSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..", "..");
const out = join(import.meta.dirname, "..", "out");
execSync("npx next build", { stdio: "inherit", env: { ...process.env, PAGES_BASE_PATH: "/vestex-legal" } });

const keep = new Set([".git", ".gitignore", ".nojekyll", "site", "README.md", ".DS_Store"]);
for (const entry of readdirSync(root)) if (!keep.has(entry)) rmSync(join(root, entry), { recursive: true, force: true });
cpSync(out, root, { recursive: true });
// GitHub Pages must not run Jekyll, or the _next/ folder is dropped.
if (!existsSync(join(root, ".nojekyll"))) writeFileSync(join(root, ".nojekyll"), "");
console.log("Published to", root);
