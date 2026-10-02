import { featureCards, pageMetadata, pricingFaqs, site, withBase } from '../data/site';

export const prerender = true;

export function GET() {
  const languageList = site.languages.map((language) => `- ${language}`).join('\n');
  const featureList = featureCards.map((feature) => `- **${feature.title}** ${feature.description}`).join('\n');
  const faqList = pricingFaqs.map((faq) => `### ${faq.question}\n${faq.answer}`).join('\n\n');

  const body = `# ${site.name}: full public reference\n\n> ${site.description}\n\n## Product summary\n\n${site.name} is an iPhone and iPad app for transcribing spoken video into timed subtitles, translating those subtitles, and adjusting their position, size, color, and background treatment.\n\n## Workflow\n\n1. Choose a video from Photos or Files.\n2. Set the spoken and subtitle languages; the site describes a hard-to-hear audio profile for difficult speech.\n3. Review the transcript and subtitle styling.\n4. Export a captioned video or subtitle file.\n\n## Features\n\n${featureList}\n\n## Supported languages\n\n${languageList}\n\n## Access options\n\n- Weekly: ${site.plans.weekly.trial} for eligible new subscribers, then ${site.plans.weekly.price} ${site.plans.weekly.cadence}.\n- Lifetime: ${site.plans.lifetime.price} ${site.plans.lifetime.cadence}.\n\nCloud Time is a separate usage balance and is also sold in-app. Private On-Device transcription is available. Optional High Accuracy Cloud uploads only extracted audio; the original video is never uploaded. Translation and video export remain local.\n\n## Pricing FAQs\n\n${faqList}\n\n## Canonical public page paths\n\n- ${withBase(pageMetadata.home.pathname)}\n- ${withBase(pageMetadata.app.pathname)}\n- ${withBase(pageMetadata.howItWorks.pathname)}\n- ${withBase(pageMetadata.features.pathname)}\n- ${withBase(pageMetadata.pricing.pathname)}\n- ${withBase(pageMetadata.support.pathname)}\n\n## Legal pages\n\nThe Privacy Policy and Terms of Use are published on the site. Developer: Eli Linden. App Store: ${site.appPath}.\n\nThis is a supplemental machine-readable reference. Use the crawlable pages, metadata, structured data, robots.txt, and XML sitemap as the primary discovery sources.\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
