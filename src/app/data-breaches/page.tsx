import { Metadata } from 'next';
import { getAllArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';

export const metadata: Metadata = {
  title: 'Data Breaches - Latest Breach Reports',
  description: 'Latest data breach reports, investigations, and security incident analysis.',
};

export default function DataBreachesPage() {
  const articles = getAllArticles().filter(a => a.category === 'Data Breaches');

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            <span className="text-orange-400">Data</span> Breaches
          </h1>
          <p className="text-lg text-gray-400">
            Latest data breach reports and incident analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400">No data breach articles found yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
