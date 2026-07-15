import { absoluteUrl, site } from '../data/site';

export const prerender = true;

export function GET() {
  const lines = [
    'User-agent: *',
    'Allow: /',
    '',
    'User-agent: OAI-SearchBot',
    site.seo.crawlerPolicy.allowOaiSearchBot ? 'Allow: /' : 'Disallow: /',
    '',
    'User-agent: ChatGPT-User',
    site.seo.crawlerPolicy.allowChatGptUser ? 'Allow: /' : 'Disallow: /',
    '',
    'User-agent: GPTBot',
    site.seo.crawlerPolicy.allowGptBot ? 'Allow: /' : 'Disallow: /',
    '',
    `Sitemap: ${absoluteUrl('/sitemap-index.xml')}`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
