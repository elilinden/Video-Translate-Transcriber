import { pageMetadata, site } from '../data/site';

export const prerender = true;

export function GET() {
  const body = `# ${site.name}\n\n> ${site.description}\n\n${site.name} is an iPhone app for transcribing spoken video, translating it, and styling timed subtitles for sharing.\n\n## Public pages\n\n- [Open app](${pageMetadata.app.pathname}): Start a new video project and set transcription and subtitle languages.\n- [How it works](${pageMetadata.howItWorks.pathname}): The visible four-step video-to-subtitles workflow.\n- [Features](${pageMetadata.features.pathname}): Timed transcript, translation, and subtitle-style capabilities described on the site.\n- [Pricing](${pageMetadata.pricing.pathname}): The visible weekly trial and lifetime access options, plus purchase FAQs.\n- [Support](${pageMetadata.support.pathname}): Practical workflow and purchase-restoration guidance.\n\n## Important limits\n\n- The public App Store listing, public support contact, legal entity, production website domain, and final legal policies are not yet supplied.\n- This reference supplements the crawlable website, metadata, structured data, robots.txt, and sitemap; it does not replace them.\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
