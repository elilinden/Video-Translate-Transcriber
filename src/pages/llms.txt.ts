import { pageMetadata, site, withBase } from '../data/site';

export const prerender = true;

export function GET() {
  const body = `# ${site.name}\n\n> ${site.description}\n\n${site.name} is an iPhone and iPad app for transcribing spoken video, translating it, and styling timed subtitles for sharing.\n\n## Public pages\n\n- [View on the App Store](${site.appPath}): Download the native app for iPhone and iPad.\n- [How it works](${withBase(pageMetadata.howItWorks.pathname)}): The visible four-step video-to-subtitles workflow.\n- [Features](${withBase(pageMetadata.features.pathname)}): Timed transcript, translation, and subtitle-style capabilities described on the site.\n- [Pricing](${withBase(pageMetadata.pricing.pathname)}): The visible weekly trial and lifetime access options, plus purchase FAQs.\n- [Support](${withBase(pageMetadata.support.pathname)}): Practical workflow and purchase-restoration guidance.\n\n## Important limits\n\n- Developer: Eli Linden. Support: batchcompressvideos@gmail.com.\n- Private On-Device transcription is available; optional High Accuracy Cloud uploads only extracted audio for AssemblyAI speech-to-text. Translation and video rendering remain local.\n- This reference supplements the crawlable website, metadata, structured data, robots.txt, and sitemap; it does not replace them.\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
