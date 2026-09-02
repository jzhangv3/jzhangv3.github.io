export const SITE = {
  name: 'Jimmy Zhang',
  site: 'https://jzhangv3.github.io',
  base: '/',
  trailingSlash: false,
  googleSiteVerificationId: 'fGNZs8TlhmprZRNsvKVOp4ZPHQCcQ3EQvGt4VP7H1eY',
  googleAnalytics: null,
};

export const METADATA = {
  title: SITE.name,
  useTitleTemplate: true,
  description:
    '🚀 Suitable for Startups, Small Business, Sass Websites, Professional Portfolios, Marketing Websites, Landing Pages & Blogs.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    site_name: SITE.name,
    images: [
      {
        url: '~/assets/images/default.png',
        width: 1200,
        height: 628,
      },
    ],
    type: 'website',
  },
};
