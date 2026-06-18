import { Metadata } from 'next';
import { getAllArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';

export const metadata: Metadata = {
  title: 'AI News - Artificial Intelligence in Cybersecurity',
  description: 'Latest news about artificial intelligence, machine learning, and their applications in cybersecurity.',
};

export default function AINewsPage() {
  const articles = getAllArticles().filter(a => a.category === 'AI News');

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            <span className="text-cyber-green">AI</span> News
          </h1>
          <p className="text-lg text-gray-400">
            Artificial intelligence and machine learning in cybersecurity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400">No AI articles found yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
