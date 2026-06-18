import Link from 'next/link';
import { Article } from '@/types';

interface TrendingWidgetProps {
  articles: Article[];
}

export default function TrendingWidget({ articles }: TrendingWidgetProps) {
  return (
    <div className="cyber-card">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-cyber-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <h3 className="text-lg font-display font-bold text-white">Trending Now</h3>
      </div>
      <div className="space-y-4">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/article/${article.slug}`}
            className="block group"
          >
            <h4 className="text-sm font-medium text-gray-300 group-hover:text-cyber-cyan transition-colors line-clamp-2">
              {article.title}
            </h4>
            <p className="text-xs text-gray-500 mt-1">{article.readingTime}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
