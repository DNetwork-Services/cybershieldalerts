import Link from 'next/link';
import { SearchArticle } from '@/lib/search-client';

interface SearchResultsProps {
  results: SearchArticle[];
  query: string;
}

export default function SearchResults({ results, query }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-cyber-gray/50 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No results found</h3>
        <p className="text-gray-400">
          No articles found for &ldquo;{query}&rdquo;. Try different keywords.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-gray-400 mb-6">
        Found {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((article) => (
          <Link
            key={article.slug}
            href={`/article/${article.slug}`}
            className="group block h-full"
          >
            <article className="hb-card-hover h-full flex flex-col">
              <div className="flex flex-col flex-1 p-4">
                <div className="flex items-center gap-2 text-[11px] font-mono text-gray-500 mb-2">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span>{article.readingTime}</span>
                </div>
                <h3 className="font-display font-bold text-white group-hover:text-cyber-cyan transition-colors line-clamp-2 leading-snug text-base">
                  {article.title}
                </h3>
                {article.description && (
                  <p className="text-gray-500 mt-2 line-clamp-2 flex-1 text-sm leading-relaxed">
                    {article.description}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-cyber-gray/20">
                  <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded bg-cyber-cyan/10 text-cyber-cyan">
                    {article.category}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
