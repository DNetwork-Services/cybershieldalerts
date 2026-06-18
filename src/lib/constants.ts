import { NavItem, SocialLink } from '@/types';

export const SITE_NAME = 'CyberShield Alerts';
export const SITE_DESCRIPTION = 'Daily Cybersecurity, AI & Hacking News';
export const SITE_URL = 'https://cybershieldalerts.com';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'News', href: '/news' },
  { label: 'AI News', href: '/ai-news' },
  { label: 'Cybersecurity', href: '/cybersecurity' },
  { label: 'Hacking', href: '/hacking-news' },
  { label: 'Threat Intel', href: '/threat-intelligence' },
  { label: 'About', href: '/about' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/cybershieldalerts/',
    username: '@cybershieldalerts',
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/deepak-nemade/',
    username: 'Deepak Nemade',
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/DeepDN',
    username: 'DeepDN',
  },
];

export const CATEGORIES = [
  { name: 'News', slug: 'news', description: 'Latest cybersecurity news and updates' },
  { name: 'AI News', slug: 'ai-news', description: 'Artificial intelligence and machine learning in security' },
  { name: 'Cybersecurity', slug: 'cybersecurity', description: 'In-depth cybersecurity analysis and reports' },
  { name: 'Hacking News', slug: 'hacking-news', description: 'Hacking incidents and ethical hacking updates' },
  { name: 'Threat Intelligence', slug: 'threat-intelligence', description: 'Advanced threat analysis and intelligence' },
  { name: 'Data Breaches', slug: 'data-breaches', description: 'Data breach reports and investigations' },
];

export const BRAND_COLORS = {
  primary: '#00f5ff',
  secondary: '#00ff88',
  accent: '#7b2ff7',
  danger: '#ff0080',
  dark: '#0a0a0f',
  darker: '#0d1117',
  navy: '#1a1f3c',
};
