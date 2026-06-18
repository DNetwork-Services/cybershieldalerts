import Link from 'next/link';
import { getLatestArticles, getFeaturedArticles } from '@/lib/articles';
import { SITE_NAME } from '@/lib/constants';
import ArticleCard from '@/components/ArticleCard';
import TrendingWidget from '@/components/TrendingWidget';

export default function HomePage() {
  const latestArticles = getLatestArticles(12);
  const featuredArticles = getFeaturedArticles();
  const trendingArticles = getLatestArticles(8);

  const cyberArticles = latestArticles.filter(a => a.category === 'Cybersecurity').slice(0, 3);
  const aiArticles = latestArticles.filter(a => a.category === 'AI News').slice(0, 3);
  const hackArticles = latestArticles.filter(a => a.category === 'Hacking News').slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-cyan/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyber-cyan/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
              <span className="text-sm text-cyber-cyan">Live Threat Intelligence</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
              <span className="gradient-text">CyberShield</span>{' '}
              <span className="text-white">Alerts</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Daily Cybersecurity, AI & Hacking News
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyber-cyan">500+</div>
                <div className="text-sm text-gray-500">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyber-green">50K+</div>
                <div className="text-sm text-gray-500">Readers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyber-purple">24/7</div>
                <div className="text-sm text-gray-500">Updates</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/news" className="cyber-button text-center">
                Explore News
              </Link>
              <Link href="/about" className="cyber-button-outline text-center">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News + Trending Sidebar */}
      <section className="py-16 bg-cyber-dark/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="section-title">Latest News</h2>
                <Link href="/news" className="text-cyber-cyan text-sm hover:underline">
                  View all &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {latestArticles.slice(0, 4).map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <TrendingWidget articles={trendingArticles} />

              {/* Newsletter Widget */}
              <div className="cyber-card bg-gradient-to-br from-cyber-cyan/10 to-cyber-green/10 border-cyber-cyan/20">
                <h3 className="text-lg font-display font-bold text-white mb-2">Stay Informed</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Get daily cybersecurity updates delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="cyber-input text-sm"
                  />
                  <button className="cyber-button w-full text-sm">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Updates Section */}
      {aiArticles.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="section-title">
                AI <span className="text-cyber-green">News</span>
              </h2>
              <Link href="/ai-news" className="text-cyber-cyan text-sm hover:underline">
                View all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aiArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hacking News Section */}
      {hackArticles.length > 0 && (
        <section className="py-16 bg-cyber-dark/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="section-title">
                Hacking <span className="text-red-400">News</span>
              </h2>
              <Link href="/hacking-news" className="text-cyber-cyan text-sm hover:underline">
                View all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hackArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cyber Threat Reports */}
      {cyberArticles.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="section-title">
                <span className="text-cyber-cyan">Cyber</span>security
              </h2>
              <Link href="/cybersecurity" className="text-cyber-cyan text-sm hover:underline">
                View all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cyberArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'News', href: '/news', emoji: '📰', color: 'from-blue-500 to-cyan-500' },
              { name: 'AI News', href: '/ai-news', emoji: '🤖', color: 'from-green-500 to-emerald-500' },
              { name: 'Cybersecurity', href: '/cybersecurity', emoji: '🛡️', color: 'from-cyan-500 to-blue-500' },
              { name: 'Hacking', href: '/hacking-news', emoji: '💻', color: 'from-red-500 to-pink-500' },
              { name: 'Threat Intel', href: '/threat-intelligence', emoji: '🔍', color: 'from-purple-500 to-indigo-500' },
              { name: 'Data Breaches', href: '/data-breaches', emoji: '🔓', color: 'from-orange-500 to-red-500' },
            ].map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group cyber-card text-center hover:border-cyber-cyan/50 transition-all"
              >
                <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`}>
                  {category.emoji}
                </div>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/10 via-cyber-green/5 to-cyber-purple/10" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-cyber-cyan/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-cyber-green/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-green/10 border border-cyber-green/20 mb-6">
            <svg className="w-4 h-4 text-cyber-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-sm text-cyber-green">Newsletter</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Never Miss a Threat
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Join 50,000+ security professionals who get daily cybersecurity intelligence updates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="cyber-input flex-1"
            />
            <button className="cyber-button whitespace-nowrap">
              Subscribe Free
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            No spam. Unsubscribe anytime. Read by security teams at Fortune 500 companies.
          </p>
        </div>
      </section>
    </div>
  );
}
