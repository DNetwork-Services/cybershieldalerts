import { Metadata } from 'next';
import SearchPageClient from '@/components/SearchPageClient';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search CyberShield Alerts articles.',
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || '';

  return <SearchPageClient initialQuery={query} />;
}
