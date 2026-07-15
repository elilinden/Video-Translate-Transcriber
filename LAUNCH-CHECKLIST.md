# Launch checklist

## Required before publishing

- [ ] In [src/data/site.ts](src/data/site.ts), replace `https://video-translate-transcriber.invalid` with the exact final HTTPS site URL. Rebuild so canonical tags, sitemap URLs, robots, and social image URLs all use that one domain.
- [ ] Add the verified App Store URL, public support email, legal business/developer name, privacy-policy date, and any verified social profile.
- [ ] Review the published Privacy Policy and Terms of Use with counsel whenever app data handling, subscription terms, or legal requirements change.
- [ ] Confirm the weekly trial, weekly price, lifetime price, restore-purchase wording, and App Store subscription configuration match exactly.
- [ ] Review whether the stated on-device processing description and App Store privacy disclosures remain accurate for the release build.
- [ ] Decide whether GPTBot should stay blocked. It is blocked by default; OAI-SearchBot and ChatGPT-User are allowed.
- [ ] Leave analytics disabled unless its provider, domain, consent handling, and privacy disclosure have been approved.

## Pre-deployment quality checks

- [ ] Run `npm install`.
- [ ] Run `npm run check`.
- [ ] Run `npm run build`.
- [ ] Run `npm run validate` and resolve every error. The `.invalid` placeholder warning should disappear after the real URL is configured.
- [ ] Test the built site at a narrow mobile width and a desktop width. Check all page links, the mobile menu, footer links, keyboard focus, pricing FAQ disclosure controls, and the social image preview.
- [ ] Verify `robots.txt`, `sitemap-index.xml`, `llms.txt`, and `llms-full.txt` in the built output.

## Deploy and verify

- [ ] Deploy the generated `dist/` directory with the selected static hosting provider. Do not upload `src/`, `node_modules/`, or development files.
- [ ] Confirm HTTPS, the canonical host, and the preferred www/non-www redirect behavior at the host level.
- [ ] Open each deployed URL, including `/robots.txt`, `/sitemap-index.xml`, `/llms.txt`, and `/llms-full.txt`.
- [ ] Add the Google Search Console token to `site.seo.verification.google`, deploy, and verify the exact canonical-domain property in Google Search Console. Submit `https://your-domain.example/sitemap-index.xml`.
- [ ] Add the Bing Webmaster Tools token to `site.seo.verification.bing`, deploy, and verify the same canonical domain in Bing Webmaster Tools. Submit the same sitemap URL.
- [ ] Use each platform's URL inspection tool for the homepage, pricing, and features pages after indexing is available.
- [ ] If IndexNow is approved, publish the provider key file, enable the environment variables, and submit only changed canonical URLs with `npm run indexnow`.
