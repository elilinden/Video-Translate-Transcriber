# SEO and AI discovery reference

## What is implemented

| Area | Implementation |
| --- | --- |
| Page metadata | Distinct title, description, canonical URL, Open Graph tags, and Twitter card metadata for every page. |
| Social preview | `public/social-share.png`, with descriptive alternative text in metadata. |
| Crawl discovery | Build-time `sitemap-index.xml` from `@astrojs/sitemap`; `robots.txt` generated from central configuration. |
| Structured data | WebSite on the homepage; WebPage on every route; visible BreadcrumbList data on inner pages; MobileApplication on Features; exact FAQPage data on Pricing. |
| AI-readable references | `llms.txt` and `llms-full.txt` endpoints. They supplement, not replace, standard crawlable content. |
| Verification | Empty Google and Bing fields in `site.ts`; no tokens are guessed or published. |
| Analytics and IndexNow | Both disabled by default. Their configuration points are documented without adding a tracking script or network call. |

## Crawler policy

`src/pages/robots.txt.ts` reads `site.seo.crawlerPolicy`.

| User agent | Current policy | Reason |
| --- | --- | --- |
| Normal public crawlers | Allowed | Public marketing pages should be discoverable. |
| OAI-SearchBot | Allowed | Explicitly requested for search discovery. |
| ChatGPT-User | Allowed | Explicitly requested for user-initiated fetches. |
| GPTBot | Disallowed | Separately configurable, defaulting to no model-training access. |

Legal draft pages use `<meta name="robots" content="noindex,follow">`; they are not blocked in `robots.txt`. That preserves normal link discovery without asking search engines to index incomplete legal documents.

## Truthfulness boundaries

No Organization or Person schema is published because a verified responsible entity has not been supplied. The site also avoids structured pricing offers, reviews, ratings, download claims, availability claims, and App Store links because their required public details are not yet verified.

The central configuration deliberately uses `https://video-translate-transcriber.invalid` until the actual production domain is known. This is detectable by the validation script and must be changed before release.

## Local validation

`npm run validate` inspects the generated `dist/` folder for:

- missing or duplicate titles and descriptions;
- canonical coverage and sitemap-to-canonical mismatches;
- broken internal links and local image references;
- JSON-LD parsing and expected schema types;
- visible pricing FAQ question matching;
- document language, landmarks, headings, alt-text presence, and accidental forms;
- placeholder domains and TODO markers;
- static asset-size inventory as a local performance guardrail.

It is not a substitute for a hosted Lighthouse run, real Google Rich Results testing, Search Console inspection, or legal review. Run those after the final domain and hosting environment exist.
