import Link from 'next/link';
import { Article } from '@/types';

interface TrendingWidgetProps {
  articles: Article[];
}

export default function TrendingWidget({ articles }: TrendingWidgetProps) {
  return (
    <div className="hb-card-hover">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-cyber-green/10 flex items-center justify-center">
          <svg className="w-4 h-4 text-cyber-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <h3 className="text-base font-display font-bold text-white">Trending Now</h3>
      </div>
      <div className="space-y-4">
        {articles.slice(0, 6).map((article, index) => (
          <Link
            key={article.slug}
            href={`/article/${article.slug}`}
            className="group flex gap-3 items-start"
          >
            <span className="text-xs font-mono font-bold text-gray-600 w-5 pt-0.5 shrink-0">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-300 group-hover:text-cyber-cyan transition-colors line-clamp-2 leading-snug">
                {article.title}
              </h4>
              <p className="text-xs text-gray-600 mt-1">{article.readingTime}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
