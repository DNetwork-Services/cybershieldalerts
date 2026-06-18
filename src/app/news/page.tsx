import { Metadata } from 'next';
import { getAllArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';

export const metadata: Metadata = {
  title: 'Latest Cybersecurity News',
  description: 'Stay updated with the latest cybersecurity news, threats, and vulnerabilities.',
};

export default function NewsPage() {
  const articles = getAllArticles().filter(a =>
    a.category === 'News' || a.category === 'Data Breaches' || a.category === 'Cyber Threats'
  );

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Latest <span className="hb-gradient-text">News</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            Stay informed with the latest cybersecurity news and threat intelligence.
          </p>
          <div className="section-divider mt-4" />
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-cyber-gray/50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="text-gray-400">No articles found in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
