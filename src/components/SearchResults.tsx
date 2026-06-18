import { Article } from '@/types';
import ArticleCard from './ArticleCard';

interface SearchResultsProps {
  results: Article[];
  query: string;
}

export default function SearchResults({ results, query }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
        <p className="text-gray-400">
          No articles found for &quot;{query}&quot;. Try different keywords.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-gray-400 mb-6">
        Found {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
