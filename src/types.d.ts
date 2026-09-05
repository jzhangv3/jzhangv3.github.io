export interface SiteType {
  name: string;
  site: string;
  base: string;
  trailingSlash: 'ignore' | 'always' | 'never';
  googleSiteVerificationId: string;
  googleAnalytics: string | null;
  date: string;
}

export interface MetadataType {
  title: string;
  useTitleTemplate: boolean;
  canonical?: string;
  description: string;
  robots: {
    index: boolean;
    follow: boolean;
  };
  openGraph: {
    site_name: string;
    images: {
      url: string;
      width: number;
      height: number;
    }[];
    type: string;
  };
}
