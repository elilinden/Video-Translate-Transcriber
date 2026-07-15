export const publicFactsTodo = {
  productionUrl: 'TODO: replace video-translate-transcriber.invalid with the production HTTPS domain before launch',
  appStoreUrl: 'TODO: add the verified App Store listing URL before launch',
  supportEmail: 'TODO: add the public support email before launch',
  legalEntity: 'TODO: add the legal business or developer name before launch',
  privacyEffectiveDate: 'TODO: add the privacy policy effective date before launch',
  socialHandle: 'TODO: add a verified social profile if one will be published',
  googleVerification: 'TODO: add the Google Search Console verification token after the domain is live',
  bingVerification: 'TODO: add the Bing Webmaster Tools verification token after the domain is live',
  analyticsDomain: 'TODO: add an analytics domain only after consent and provider details are confirmed',
  indexNowHost: 'TODO: add the deployed host before enabling IndexNow',
} as const;

export const site = {
  name: 'Video Translate Transcriber',
  shortName: 'Video Translate Transcriber',
  description:
    'Transcribe spoken video, translate it into the language you need, and create thoughtfully timed subtitles.',
  announcement: 'Made for clear, share-ready video',
  appPath: '/app',
  nav: [
    { href: '/app', label: 'Open app' },
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
      price: '$49.99',
      cadence: 'one time',
      trial: 'No subscription',
      note: 'One payment. Yours forever.',
    },
  },
  seo: {
    // Reserved .invalid keeps the local build honest until a real domain is supplied.
    canonicalBaseUrl: 'https://video-translate-transcriber.invalid',
    locale: 'en_US',
    socialImagePath: '/social-share.png',
    noindexPaths: ['/privacy', '/terms'],
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
    title: 'Video Translate Transcriber — Clear subtitles for every video',
    description:
      'Transcribe and translate spoken video, fine-tune subtitles, and make a version your audience can follow.',
  },
  app: {
    pathname: '/app',
    label: 'Open app',
    title: 'Video Translate Transcriber — Start a project',
    description:
      'Open Video Translate Transcriber to prepare a video for transcription, translation, and subtitles.',
  },
  howItWorks: {
    pathname: '/how-it-works',
    label: 'How it works',
    title: 'How it works — Video Translate Transcriber',
    description:
      'See the simple flow for turning a video into timed, styled subtitles in another language.',
  },
  features: {
    pathname: '/features',
    label: 'Features',
    title: 'Subtitle features for iPhone — Video Translate Transcriber',
    description:
      'Explore timed transcripts, hard-to-hear audio support, translation, and subtitle styling controls for iPhone.',
  },
  pricing: {
    pathname: '/pricing',
    label: 'Pricing',
    title: 'Pricing — Video Translate Transcriber',
    description:
      'Start a three-day free trial with weekly access, or choose one payment for lifetime access.',
  },
  support: {
    pathname: '/support',
    label: 'Support',
    title: 'Support — Video Translate Transcriber',
    description:
      'Practical help for choosing video, improving difficult audio transcription, and restoring purchase access.',
  },
  privacy: {
    pathname: '/privacy',
    label: 'Privacy',
    title: 'Privacy — Video Translate Transcriber',
    description:
      'Read the current pre-release privacy overview for Video Translate Transcriber.',
  },
  terms: {
    pathname: '/terms',
    label: 'Terms',
    title: 'Terms — Video Translate Transcriber',
    description:
      'Read the current pre-release terms overview for Video Translate Transcriber.',
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
  return new URL(normalizedPath, site.seo.canonicalBaseUrl).toString();
}

export function isNoindexPath(pathname: string) {
  return (site.seo.noindexPaths as readonly string[]).includes(pathname);
}

export function isPlaceholderDomain() {
  return new URL(site.seo.canonicalBaseUrl).hostname.endsWith('.invalid');
}
