# Gagan Yadav — Portfolio

**Live site:** https://gagan424266.github.io/Portfolio/

Personal portfolio built with React, TypeScript, Three.js, and GSAP.

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

Resume: `public/resume/Gagan-Yadav-Resume.docx`

## Deploy (GitHub Pages)

1. Repo **Settings → Pages → Build and deployment → Source:** **GitHub Actions**
2. Push to `main` — workflow `.github/workflows/deploy.yml` publishes the site
3. Set **About** (gear on repo home) → **Website:** `https://gagan424266.github.io/Portfolio/`

## GSAP

Uses GSAP trial plugins (ScrollSmoother, SplitText) for development. For production hosting, use a [GSAP license](https://gsap.com/pricing/) or replace those plugins.

## Author

© 2026 Gagan Yadav · [GitHub](https://github.com/Gagan424266) · [LinkedIn](https://www.linkedin.com/in/gagan-yadav-584a9a214/)
