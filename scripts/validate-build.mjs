import { gzipSync } from 'node:zlib';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const dist = resolve('dist');
const canonicalBase = 'https://video-translate-transcriber.invalid';
const errors = [];
const warnings = [];

if (!existsSync(dist)) {
  throw new Error('dist/ is missing. Run npm run build before validation.');
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function routeFor(file) {
  const normalized = relative(dist, file).split('\\').join('/');
  if (normalized === 'index.html') return '/';
  return '/' + normalized.replace(/\/index\.html$/, '');
}

function contentFor(file) {
  return readFileSync(file, 'utf8');
}

function attribute(tag, attributeName) {
  return tag.match(new RegExp('\\b' + attributeName + '=["\']([^"\']*)["\']', 'i'))?.[1];
}

function canonicalFor(route) {
  return canonicalBase + (route === '/' ? '/' : route + '/');
}

const allFiles = walk(dist);
const htmlFiles = allFiles.filter((file) => file.endsWith('.html'));
const routes = new Set(htmlFiles.map(routeFor));
const titles = new Map();
const descriptions = new Map();
const noindexRoutes = new Set(['/privacy', '/terms']);
let linkChecks = 0;
let imageChecks = 0;
let jsonLdDocuments = 0;
let accessibilityChecks = 0;

for (const file of htmlFiles) {
  const html = contentFor(file);
  const route = routeFor(file);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const description = html.match(/<meta name="description" content="([^"]*)">/i)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]*)">/i)?.[1];
  const robots = html.match(/<meta name="robots" content="([^"]*)">/i)?.[1];

  if (!/<html lang="[a-z-]+">/i.test(html)) errors.push(route + ': missing document language.');
  if (!title) errors.push(route + ': missing title.');
  if (!description) errors.push(route + ': missing meta description.');
  if (!canonical) errors.push(route + ': missing canonical URL.');
  if ((html.match(/<h1[\s>]/gi) ?? []).length !== 1) errors.push(route + ': must have exactly one h1.');
  if ((html.match(/<main[\s>]/gi) ?? []).length !== 1) errors.push(route + ': must have exactly one main landmark.');
  if (!robots) errors.push(route + ': missing robots directive.');
  if (noindexRoutes.has(route) !== (robots?.includes('noindex') ?? false)) errors.push(route + ': noindex policy does not match the central configuration.');
  if (canonical && canonical !== canonicalFor(route)) errors.push(route + ': canonical URL differs from the configured canonical base.');
  if (title) {
    const existing = titles.get(title) ?? [];
    existing.push(route);
    titles.set(title, existing);
  }
  if (description) {
    const existing = descriptions.get(description) ?? [];
    existing.push(route);
    descriptions.set(description, existing);
  }

  const links = html.matchAll(/<a\b[^>]*>/gi);
  for (const match of links) {
    const href = attribute(match[0], 'href');
    if (!href || href.startsWith('#') || /^(?:https?:|mailto:|tel:)/.test(href)) continue;
    const target = href.split('#')[0].split('?')[0] || route;
    linkChecks += 1;
    if (!routes.has(target)) errors.push(route + ': broken internal link ' + href + '.');
  }

  const images = html.matchAll(/<img\b[^>]*>/gi);
  for (const match of images) {
    imageChecks += 1;
    const alt = attribute(match[0], 'alt');
    const src = attribute(match[0], 'src');
    if (alt === undefined) errors.push(route + ': image is missing alt text.');
    if (src?.startsWith('/') && !existsSync(join(dist, src))) errors.push(route + ': image asset is missing at ' + src + '.');
  }

  if (/<form\b/i.test(html)) errors.push(route + ': contains a form without a verified backend.');

  const schemas = html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);
  const parsedSchemas = [];
  for (const schemaMatch of schemas) {
    try {
      parsedSchemas.push(JSON.parse(schemaMatch[1]));
      jsonLdDocuments += 1;
    } catch {
      errors.push(route + ': malformed JSON-LD.');
    }
  }
  if (!parsedSchemas.some((schema) => schema['@type'] === 'WebPage')) errors.push(route + ': missing WebPage structured data.');
  if (route === '/' && !parsedSchemas.some((schema) => schema['@type'] === 'WebSite')) errors.push('Home: missing WebSite structured data.');
  if (route === '/features' && !parsedSchemas.some((schema) => schema['@type'] === 'MobileApplication')) errors.push('Features: missing MobileApplication structured data.');
  if (route === '/pricing') {
    const faq = parsedSchemas.find((schema) => schema['@type'] === 'FAQPage');
    if (!faq) errors.push('Pricing: missing FAQPage structured data.');
    else for (const entry of faq.mainEntity ?? []) if (!html.includes(entry.name)) errors.push('Pricing: FAQ schema question is not visible: ' + entry.name + '.');
  }
  if (route !== '/' && !parsedSchemas.some((schema) => schema['@type'] === 'BreadcrumbList')) errors.push(route + ': missing BreadcrumbList structured data.');
  accessibilityChecks += 4 + imageChecks;
}

for (const [title, titleRoutes] of titles) if (titleRoutes.length > 1) errors.push('Duplicate title "' + title + '" on ' + titleRoutes.join(', ') + '.');
for (const [description, descriptionRoutes] of descriptions) if (descriptionRoutes.length > 1) errors.push('Duplicate description "' + description + '" on ' + descriptionRoutes.join(', ') + '.');

const sitemapIndexPath = join(dist, 'sitemap-index.xml');
if (!existsSync(sitemapIndexPath)) {
  errors.push('Missing generated sitemap-index.xml.');
} else {
  const sitemapIndex = contentFor(sitemapIndexPath);
  const sitemapFiles = [...sitemapIndex.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname.slice(1));
  const sitemapUrls = new Set();
  for (const sitemapFile of sitemapFiles) {
    const localFile = join(dist, sitemapFile);
    if (!existsSync(localFile)) {
      errors.push('Sitemap index points to missing ' + sitemapFile + '.');
      continue;
    }
    for (const match of contentFor(localFile).matchAll(/<loc>([^<]+)<\/loc>/g)) sitemapUrls.add(match[1]);
  }
  const indexableRoutes = [...routes].filter((route) => !noindexRoutes.has(route));
  for (const route of indexableRoutes) if (!sitemapUrls.has(canonicalFor(route))) errors.push('Sitemap is missing canonical route ' + route + '.');
  for (const route of noindexRoutes) if (sitemapUrls.has(canonicalFor(route))) errors.push('Sitemap includes noindex route ' + route + '.');
}

if (existsSync(join(dist, 'social-share.png'))) {
  const bytes = statSync(join(dist, 'social-share.png')).size;
  if (bytes < 5_000) errors.push('Social-sharing image is unexpectedly small.');
} else {
  errors.push('Missing social-sharing image.');
}

const placeholderMatches = allFiles
  .filter((file) => /\.(?:html|xml|txt)$/i.test(file))
  .flatMap((file) => (contentFor(file).match(/video-translate-transcriber\.invalid|TODO:/g) ?? []).map((match) => relative(dist, file) + ' (' + match + ')'));
if (placeholderMatches.length) warnings.push('Launch placeholders detected in generated output: ' + placeholderMatches.length + '. The configured canonical host is intentionally .invalid until a real domain is supplied.');

const assetBytes = allFiles.reduce((total, file) => total + statSync(file).size, 0);
const cssBytes = allFiles.filter((file) => file.endsWith('.css')).reduce((total, file) => total + statSync(file).size, 0);
const htmlBytes = htmlFiles.reduce((total, file) => total + statSync(file).size, 0);
const jsEntryPoints = allFiles.filter((file) => file.endsWith('.js')).length;
const gzipBytes = gzipSync(Buffer.concat(allFiles.map((file) => readFileSync(file)))).length;

console.log('Validated ' + htmlFiles.length + ' HTML pages, ' + linkChecks + ' internal links, ' + imageChecks + ' image tags, and ' + jsonLdDocuments + ' JSON-LD documents.');
console.log('Accessibility checks: ' + accessibilityChecks + ' static checks completed; ' + errors.length + ' issue(s).');
console.log('Performance inventory: ' + Math.round(assetBytes / 1024) + ' KB raw, ' + Math.round(gzipBytes / 1024) + ' KB gzip combined, ' + Math.round(cssBytes / 1024) + ' KB CSS, ' + Math.round(htmlBytes / 1024) + ' KB HTML, ' + jsEntryPoints + ' JavaScript file(s).');
for (const warning of warnings) console.warn('WARNING: ' + warning);
for (const error of errors) console.error('ERROR: ' + error);
if (errors.length) process.exitCode = 1;
