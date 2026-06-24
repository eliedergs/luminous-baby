export type PostType = "review" | "comparativo" | "pilar";

export type RepurposeAffiliate = {
  pinterest_title: string;
  pinterest_description: string;
  instagram_hook: string;
  tiktok_angle: string;
};

export type RepurposePilar = {
  pinterest_title: string;
  pinterest_description: string;
  carousel_angle: string;
  thread_angle: string;
};

type PostBase = {
  title: string;
  description: string;
  slug: string;
  category: string;
  cluster: string;
  type: PostType;
  publishedAt: string;
  updatedAt: string;
  cover?: string;
};

export type AffiliatePost = PostBase & {
  type: "review" | "comparativo";
  affiliate: true;
  affiliateLink: string;
  repurpose: RepurposeAffiliate;
};

export type PilarPost = PostBase & {
  type: "pilar";
  affiliate: false;
  repurpose: RepurposePilar;
};

export type PostFrontmatter = AffiliatePost | PilarPost;

export type Post = PostFrontmatter & {
  content: string;
};

export type PostMeta = PostFrontmatter;

export type FAQItem = {
  question: string;
  answer: string;
};
