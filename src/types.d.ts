export interface SiteType {
  name: string;
  site: string;
  base: string;
  trailingSlash: boolean;
  googleSiteVerificationId: string;
  googleAnalytics: string | null;
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
