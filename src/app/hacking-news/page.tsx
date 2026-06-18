import { Metadata } from 'next';
import { getAllArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';

export const metadata: Metadata = {
  title: 'Hacking News - Ethical Hacking & Cybercrime',
  description: 'Latest hacking news, ethical hacking updates, and cybercrime reports.',
};

export default function HackingNewsPage() {
  const articles = getAllArticles().filter(a => a.category === 'Hacking News');

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            <span className="text-red-400">Hacking</span> News
          </h1>
          <p className="text-lg text-gray-400">
            Hacking incidents, ethical hacking, and cybercrime updates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400">No hacking articles found yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
