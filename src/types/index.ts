export interface Article {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  author: string;
  readingTime: string;
  description: string;
  coverImage: string;
  featured: boolean;
  content: string;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SocialLink {
  platform: string;
  url: string;
  username: string;
}
