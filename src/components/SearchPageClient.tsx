'use client';

import { useState } from 'react';
import { Article } from '@/types';
import SearchResults from '@/components/SearchResults';

interface SearchPageClientProps {
  initialQuery: string;
}

export default function SearchPageClient({ initialQuery }: SearchPageClientProps) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Article[]>([]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get('q') as string;
    setQuery(q);
    window.history.pushState({}, '', `/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Form */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
            Search
          </h1>
          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search articles..."
              className="cyber-input flex-1"
              autoFocus
            />
            <button type="submit" className="cyber-button">
              Search
            </button>
          </form>
        </div>

        {/* Results */}
        {query ? (
          <SearchResultsPlaceholder query={query} />
        ) : (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">Search CyberShield Alerts</h3>
            <p className="text-gray-400">Enter a search term to find articles.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SearchResultsPlaceholder({ query }: { query: string }) {
  return (
    <div className="text-center py-16">
      <p className="text-gray-400">
        Search results for &quot;{query}&quot; will appear here.
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Try searching from the homepage for the best results.
      </p>
    </div>
  );
}
