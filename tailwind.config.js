/**
 * Tailwind CSS configuration.
 *
 * `content` lists the files Tailwind scans for class names so it can tree-shake
 * unused styles out of the production build.
 *
 * `theme.extend` is intentionally left mostly empty here — INF-2 (Design tokens
 * & theme) will populate it with the per-zone color palette and design tokens
 * described in the GDD (blue/purple/teal/amber/coral).
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
