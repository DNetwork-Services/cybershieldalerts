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
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
            Search
          </h1>
          <p className="text-gray-400 mb-6">
            Search through our cybersecurity article archive.
          </p>
          <form onSubmit={handleSearch} className="flex gap-3 max-w-2xl">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search articles..."
              className="hb-input flex-1"
              autoFocus
            />
            <button type="submit" className="hb-button">
              Search
            </button>
          </form>
        </div>

        {query ? (
          <SearchResults results={results} query={query} />
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-cyber-gray/50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Search CyberShield Alerts</h3>
            <p className="text-gray-400">Enter a search term to find articles.</p>
          </div>
        )}
      </div>
    </div>
  );
}
