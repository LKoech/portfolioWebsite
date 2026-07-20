# Lydia Kipkorir | Portfolio Website

Personal portfolio website built with Astro and Tailwind CSS. Features a dark/light/high-contrast theme toggle, binary rain background animation, and an AI-powered chat assistant.

**Live:** [lydiakipkorir.xyz](https://lydiakipkorir.xyz)

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

| File | Count | What it covers |
|------|-------|----------------|
| `build.spec.ts` | 8 | Page load, title, meta, favicon |
| `content.spec.ts` | 44 | Section content, projects, experience |
| `links.spec.ts` | 8 | External links, target, rel attributes |
| `navigation.spec.ts` | 18 | Nav links, mobile menu, scroll |
| `responsive.spec.ts` | 12 | Desktop/mobile layouts, overflow |
| `accessibility.spec.ts` | 22 | Skip link, theme toggle, reduced motion, ARIA |
| `functionality.spec.ts` | 48 | Button clicks, scroll targets, chat widget |

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

## License

MIT
