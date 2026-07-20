import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://LKoech.github.io',
  base: '/portfolioWebsite',
  output: 'static',
});
