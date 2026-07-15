import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { isNoindexPath, site } from './src/data/site.ts';

export default defineConfig({
  site: site.seo.canonicalBaseUrl,
  integrations: [
    sitemap({
      filter: (page) => !isNoindexPath(new URL(page).pathname.replace(/\/$/, '') || '/'),
    }),
  ],
});
