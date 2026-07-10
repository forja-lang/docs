import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://forja-lang.github.io',
  base: '/docs',
  outDir: './dist',
  srcDir: './src',
  publicDir: './public'
});