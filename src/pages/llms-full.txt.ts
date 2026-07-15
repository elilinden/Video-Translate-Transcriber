import { featureCards, pageMetadata, pricingFaqs, site } from '../data/site';

export const prerender = true;

export function GET() {
  const languageList = site.languages.map((language) => `- ${language}`).join('\n');
  const featureList = featureCards.map((feature) => `- **${feature.title}** ${feature.description}`).join('\n');
  const faqList = pricingFaqs.map((faq) => `### ${faq.question}\n${faq.answer}`).join('\n\n');

  const body = `# ${site.name}: full public reference\n\n> ${site.description}\n\n## Product summary\n\n${site.name} is presented on this site as an iPhone app for transcribing spoken video into timed subtitles, translating those subtitles, and adjusting their position, size, color, and background treatment.\n\n## Workflow\n\n1. Choose a video from Photos or Files.\n2. Set the spoken and subtitle languages; the site describes a hard-to-hear audio profile for difficult speech.\n3. Review the transcript and subtitle styling.\n4. Export a captioned video or subtitle file.\n\n## Features\n\n${featureList}\n\n## Supported languages\n\n${languageList}\n\n## Access options\n\n- Weekly: ${site.plans.weekly.trial}, then ${site.plans.weekly.price} ${site.plans.weekly.cadence}.\n- Lifetime: ${site.plans.lifetime.price} ${site.plans.lifetime.cadence}.\n\n## Pricing FAQs\n\n${faqList}\n\n## Canonical public page paths\n\n- ${pageMetadata.home.pathname}\n- ${pageMetadata.app.pathname}\n- ${pageMetadata.howItWorks.pathname}\n- ${pageMetadata.features.pathname}\n- ${pageMetadata.pricing.pathname}\n- ${pageMetadata.support.pathname}\n\n## Pre-release and legal limits\n\nThe privacy and terms pages are pre-release, noindex overviews until the responsible legal entity, support contact, effective date, App Store disclosures, and final legal text are confirmed. No public App Store URL or verified social profile has been supplied.\n\nThis is a supplemental machine-readable reference. Use the crawlable pages, metadata, structured data, robots.txt, and XML sitemap as the primary discovery sources.\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
