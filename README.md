# Gagan Yadav — Portfolio

**Live site:** https://gagan-yadav.pages.dev

Personal portfolio built with React, TypeScript, Three.js, and GSAP.

Featured work (in order): SentinelOps, ProofWeave, CodeArena, FlowForge, PulseTrade, RouteFleet, PayLedger.

## Tech stack

- React 18 · TypeScript · Vite
- Three.js · React Three Fiber · Drei
- GSAP (ScrollTrigger, ScrollSmoother, SplitText)

## Setup

```bash
npm ci
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Content

Edit **`src/data/profile.ts`** for name, bio, experience, projects, skills, and links.

Resume: `public/resume/Gagan-Yadav-Resume.pdf`

## Deploy (Cloudflare Pages)

1. Push to `main` — workflow `.github/workflows/deploy.yml` deploys to project `gagan-yadav`
2. Repo secrets required: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
3. Manual deploy: `npm run build && npx wrangler pages deploy dist --project-name=gagan-yadav`

**Custom domain:** `gagan-yadav.dev` and `gagan007.dev` appear available (DNS NXDOMAIN). Note: `gagan_yadav.dev` is invalid (underscores not allowed); `gaganyadav.dev` is already taken. After you purchase a domain, add it under Cloudflare Pages → `gagan-yadav` → Custom domains.

## GSAP

Uses GSAP trial plugins (ScrollSmoother, SplitText) for development. For production hosting, use a [GSAP license](https://gsap.com/pricing/) or replace those plugins.

## Author

© 2026 Gagan Yadav · [GitHub](https://github.com/Gagan424266) · [LinkedIn](https://www.linkedin.com/in/gagan-yadav-584a9a214/)
