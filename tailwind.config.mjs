/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        dark: {
          50: 'rgb(var(--c-50) / <alpha-value>)',
          100: 'rgb(var(--c-100) / <alpha-value>)',
          200: 'rgb(var(--c-200) / <alpha-value>)',
          300: 'rgb(var(--c-300) / <alpha-value>)',
          400: 'rgb(var(--c-400) / <alpha-value>)',
          500: 'rgb(var(--c-500) / <alpha-value>)',
          600: 'rgb(var(--c-600) / <alpha-value>)',
          700: 'rgb(var(--c-700) / <alpha-value>)',
          800: 'rgb(var(--c-800) / <alpha-value>)',
          900: 'rgb(var(--c-900) / <alpha-value>)',
          950: 'rgb(var(--c-950) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
