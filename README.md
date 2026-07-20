# Lydia Kipkorir | Portfolio Website

Personal portfolio website built with Astro and Tailwind CSS. Features a dark/light/high-contrast theme toggle, binary rain background animation, and an AI-powered chat assistant.

**Live:** [lkoech.github.io/portfolioWebsite](https://lkoech.github.io/portfolioWebsite)

## Tech Stack

- **Framework:** [Astro](https://astro.build)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Testing:** [Playwright](https://playwright.dev)
- **Chat Backend:** [Cloudflare Workers](https://workers.cloudflare.com) + [Groq API](https://groq.com)
- **Hosting:** GitHub Pages

## Features

- Responsive design (desktop + mobile)
- Dark, light, and high-contrast themes with localStorage persistence
- Binary rain canvas animation (adapts per theme)
- AI chat assistant powered by Groq (Llama 3.1)
- Scroll-triggered animations with `prefers-reduced-motion` support
- Skip-to-content link, focus-visible outlines, ARIA labels (WCAG 2.1 compliant)
- 160 Playwright tests across 7 test suites

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Testing

```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Run a specific suite
npx playwright test tests/functionality.spec.ts
```

### Test Suites

| File | Tests | What it covers |
|------|-------|----------------|
| `build.spec.ts` | Page load, title, meta, favicon |
| `content.spec.ts` | Section content, projects, experience |
| `links.spec.ts` | External links, target, rel attributes |
| `navigation.spec.ts` | Nav links, mobile menu, scroll |
| `responsive.spec.ts` | Desktop/mobile layouts, overflow |
| `accessibility.spec.ts` | Skip link, theme toggle, reduced motion, ARIA |
| `functionality.spec.ts` | Button clicks, scroll targets, chat widget |

## Chat Assistant Setup

The chat assistant uses a Cloudflare Worker proxy to keep the Groq API key secure.

```bash
# Deploy the worker (from worker/ directory)
cd worker
npx wrangler deploy

# Set your Groq API key as a secret
npx wrangler secret put GROQ_API_KEY
```

Set the worker URL in `.env`:
```
PUBLIC_CHAT_WORKER_URL=https://your-worker.workers.dev
```

## Project Structure

```
src/
├── components/
│   ├── Nav.astro              # Navigation + theme toggle
│   ├── Hero.astro             # Hero section
│   ├── Skills.astro           # Scrolling skills bar
│   ├── About.astro            # About + stats
│   ├── Projects.astro         # Project cards
│   ├── Experience.astro       # Work experience
│   ├── Services.astro         # Services offered
│   ├── Process.astro          # How I work
│   ├── Contact.astro          # Contact + socials
│   ├── Footer.astro           # Footer
│   ├── ChatWidget.astro       # AI chat assistant
│   └── ParticleBackground.astro # Binary rain animation
├── layouts/
│   └── Layout.astro           # Base layout + theme init
├── pages/
│   └── index.astro            # Main page
└── styles/
    └── global.css             # Theme variables + overrides
tests/                         # Playwright test suites
worker/                        # Cloudflare Worker (chat proxy)
public/                        # Static assets (CV, logos, favicon)
```

## License

MIT
