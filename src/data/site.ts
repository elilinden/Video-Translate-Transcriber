export const isGitHubPagesDeployment = process.env.DEPLOY_GITHUB_PAGES === 'true';
export const siteBasePath = isGitHubPagesDeployment ? '/Video-Translate-Transcriber' : '';
const canonicalBaseUrl = isGitHubPagesDeployment
  ? 'https://elilinden.github.io/Video-Translate-Transcriber'
  : 'https://video-translate-transcriber.invalid';

export const publicFactsTodo = {
  productionUrl: 'https://elilinden.github.io/Video-Translate-Transcriber',
  appStoreUrl: 'https://apps.apple.com/us/app/video-transcriber-subtitles/id6790999008',
  supportEmail: 'batchcompressvideos@gmail.com',
  legalEntity: 'Eli Linden',
  privacyEffectiveDate: 'July 14, 2026',
  socialHandle: 'TODO: add a verified social profile if one will be published',
  googleVerification: 'TODO: add the Google Search Console verification token after the domain is live',
  bingVerification: 'TODO: add the Bing Webmaster Tools verification token after the domain is live',
  analyticsDomain: 'TODO: add an analytics domain only after consent and provider details are confirmed',
  indexNowHost: 'TODO: add the deployed host before enabling IndexNow',
} as const;

export const site = {
  name: 'Video Transcriber: Subtitles',
  shortName: 'Video Transcriber: Subtitles',
  description:
    'Transcribe spoken video, translate it into the language you need, and create thoughtfully timed subtitles.',
  announcement: 'Made for clear, share-ready video',
  appPath: 'https://apps.apple.com/us/app/video-transcriber-subtitles/id6790999008',
  nav: [
    { href: 'https://apps.apple.com/us/app/video-transcriber-subtitles/id6790999008', label: 'View on the App Store' },
    { href: '/how-it-works', label: 'How it works' },
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
  ],
  languages: [
    'Arabic',
    'Chinese (Simplified)',
    'Chinese (Traditional)',
    'Dutch',
    'English',
    'French',
    'German',
    'Hindi',
    'Indonesian',
    'Italian',
    'Japanese',
    'Korean',
    'Polish',
    'Portuguese (Brazil)',
    'Russian',
    'Spanish',
    'Thai',
    'Turkish',
    'Ukrainian',
    'Vietnamese',
  ],
  plans: {
    weekly: {
      name: 'Weekly',
      price: '$4.99',
      cadence: 'per week',
      trial: '3 days free',
      note: 'Full access. Cancel anytime.',
    },
    lifetime: {
      name: 'Lifetime',
      price: '$59.99',
      cadence: 'one time',
      trial: 'No subscription',
      note: 'One-time access. Cloud Time is a separate usage balance.',
    },
  },
  seo: {
    // Reserved .invalid keeps the local build honest until a real domain is supplied.
    canonicalBaseUrl,
    locale: 'en_US',
    socialImagePath: '/social-share.png',
    noindexPaths: [],
    crawlerPolicy: {
      allowOaiSearchBot: true,
      allowChatGptUser: true,
      allowGptBot: false,
    },
    verification: {
      google: '',
      bing: '',
    },
    analytics: {
      enabled: false,
      provider: 'TODO: configure after privacy review',
      domain: '',
    },
    indexNow: {
      enabled: false,
    },
  },
  todo: publicFactsTodo,
} as const;

export const pageMetadata = {
  home: {
    pathname: '/',
    label: 'Home',
    title: 'Video Transcriber: Subtitles — Clear subtitles for every video',
    description:
      'Transcribe and translate spoken video, fine-tune subtitles, and make a version your audience can follow.',
  },
  app: {
    pathname: '/app',
    label: 'View on the App Store',
    title: 'Video Transcriber: Subtitles — Available on the App Store',
    description:
      'Open Video Transcriber: Subtitles to prepare a video for transcription, translation, and subtitles.',
  },
  howItWorks: {
    pathname: '/how-it-works',
    label: 'How it works',
    title: 'How it works — Video Transcriber: Subtitles',
    description:
      'See the simple flow for turning a video into timed, styled subtitles in another language.',
  },
  features: {
    pathname: '/features',
    label: 'Features',
    title: 'Subtitle features for iPhone — Video Transcriber: Subtitles',
    description:
      'Explore timed transcripts, hard-to-hear audio support, translation, and subtitle styling controls for iPhone.',
  },
  pricing: {
    pathname: '/pricing',
    label: 'Pricing',
    title: 'Pricing — Video Transcriber: Subtitles',
    description:
      'Eligible new weekly subscribers can start a three-day free trial, or choose one payment for lifetime access.',
  },
  support: {
    pathname: '/support',
    label: 'Support',
    title: 'Support — Video Transcriber: Subtitles',
    description:
      'Practical help for choosing video, improving difficult audio transcription, and restoring purchase access.',
  },
  privacy: {
    pathname: '/privacy',
    label: 'Privacy',
    title: 'Privacy — Video Transcriber: Subtitles',
    description:
      'Read how Video Transcriber: Subtitles handles videos, purchases, support requests, and privacy choices.',
  },
  terms: {
    pathname: '/terms',
    label: 'Terms',
    title: 'Terms — Video Transcriber: Subtitles',
    description:
      'Read the Terms of Use for Video Transcriber: Subtitles, including subscriptions, content, and service limits.',
  },
} as const;

export type PageKey = keyof typeof pageMetadata;

export const pricingFaqs = [
  {
    question: 'How does the free trial work?',
    answer:
      'The weekly option begins with three days free for eligible new subscribers. After that, it renews at the weekly price until canceled in Apple Account settings.',
  },
  {
    question: 'What does lifetime access mean?',
    answer: 'Lifetime is a one-time purchase option. It does not renew as a subscription.',
  },
  {
    question: 'Can I restore a previous purchase?',
    answer:
      'Yes. The app includes a Restore Purchases option for purchases associated with your Apple Account.',
  },
] as const;

export const featureCards = [
  {
    eyebrow: 'UNDERSTAND',
    title: 'Start with what was actually said.',
    description:
      'Choose the spoken language, then let the app build a timed transcript you can review before anything is shared.',
    number: '01',
  },
  {
    eyebrow: 'TRANSLATE',
    title: 'Choose the language your audience needs.',
    description:
      'Move between supported languages without turning your editing flow into a complicated project.',
    number: '02',
  },
  {
    eyebrow: 'STYLE',
    title: 'Make the words feel like your video.',
    description:
      'Tune placement, size, color, and background treatment, then keep the subtitles easy to read on screen.',
    number: '03',
  },
] as const;

export function absoluteUrl(pathname = '/') {
  const normalizedPath =
    pathname === '/' || pathname.includes('.')
      ? pathname
      : pathname.replace(/\/$/, '') + '/';
  const baseUrl = site.seo.canonicalBaseUrl.endsWith('/')
    ? site.seo.canonicalBaseUrl
    : site.seo.canonicalBaseUrl + '/';
  return new URL(normalizedPath.replace(/^\//, ''), baseUrl).toString();
}

export function withBase(pathname = '/') {
  if (!pathname.startsWith('/')) return pathname;
  return siteBasePath + pathname;
}

export function isNoindexPath(pathname: string) {
  return (site.seo.noindexPaths as readonly string[]).includes(pathname);
}

export function isPlaceholderDomain() {
  return new URL(site.seo.canonicalBaseUrl).hostname.endsWith('.invalid');
}
