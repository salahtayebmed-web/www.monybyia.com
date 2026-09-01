export type Currency = 'EUR' | 'USD' | 'GBP';

export type ProductCategory = 'ebook' | 'templates' | 'prompt_pack' | 'mini_course' | 'code_toolkit';

export interface DigitalProduct {
  id: string;
  title: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  description: string;
  features: string[];
  tableOfContents: string[];
  contentPreview: string;
  salesHook: string;
  deliveryFormat: string;
  totalSales: number;
  revenueGenerated: number;
  createdAt: string;
  status: 'active' | 'draft';
  rating: number;
  badge?: string;
}

export interface AffiliateCampaign {
  id: string;
  niche: string;
  productName: string;
  network: string;
  commissionRate: string;
  avgEarningsPerSale: number;
  trackingLink: string;
  clicks: number;
  conversions: number;
  totalCommission: number;
  seoArticle: {
    title: string;
    metaDescription: string;
    summary: string;
    content: string;
  };
  socialPosts: {
    platform: string;
    content: string;
  }[];
  emailSequence: {
    subject: string;
    body: string;
  }[];
  status: 'active' | 'paused';
}

export interface MicroSaaSPlan {
  id: string;
  name: string;
  priceMonthly: number;
  credits: number;
  popular?: boolean;
  features: string[];
}

export interface AutoPilotLog {
  id: string;
  timestamp: string;
  type: 'product_sale' | 'affiliate_commission' | 'saas_subscription' | 'lead_captured' | 'content_boost';
  title: string;
  amount: number;
  details: string;
  customerName?: string;
  customerCountry?: string;
}

export interface RevenueBreakdown {
  totalRevenue: number;
  todayRevenue: number;
  digitalProductsRevenue: number;
  affiliateRevenue: number;
  saasRevenue: number;
  totalTransactionsCount: number;
  availableBalance: number;
  pendingPayout: number;
}
