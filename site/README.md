# Vestex website

Source for https://losthorizzon.github.io/vestex-legal/ — Next.js (static export),
Tailwind CSS, [Motion](https://motion.dev), [Kokonut UI](https://kokonutui.com) and
[BKLit UI](https://bklit.com) charts, the same stack as the Warsaw Financial Times site.

```bash
npm install        # once
npm run dev        # http://localhost:3000
npm run legal      # copy the Privacy Policy and Terms out of the iOS app's source
npm run publish    # build and copy the site into the repository root, then commit and push
```

| What | Where |
| --- | --- |
| Home page sections | `src/components/home/` |
| Legal text (generated, don't edit) | `src/data/legal.json` |
| Website-only legal sections | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` |
| FAQ | `FAQS` in `src/components/home/sections.tsx` |
| App screenshots | `public/screens/` |
