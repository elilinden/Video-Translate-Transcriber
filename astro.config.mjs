import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { isNoindexPath, site, siteBasePath } from './src/data/site.ts';

const deployedOnGitHubPages = Boolean(siteBasePath);

export default defineConfig({
  site: deployedOnGitHubPages ? 'https://elilinden.github.io' : site.seo.canonicalBaseUrl,
  base: siteBasePath || undefined,
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname.replace(siteBasePath, '').replace(/\/$/, '') || '/';
        return !isNoindexPath(pathname);
      },
    }),
  ],
});
