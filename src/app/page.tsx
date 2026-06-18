import Link from 'next/link';
import { getLatestArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import TrendingWidget from '@/components/TrendingWidget';

export default function HomePage() {
  const latestArticles = getLatestArticles(12);
  const trendingArticles = getLatestArticles(8);

  const cyberArticles = latestArticles.filter(a => a.category === 'Cybersecurity').slice(0, 3);
  const aiArticles = latestArticles.filter(a => a.category === 'AI News').slice(0, 3);
  const hackArticles = latestArticles.filter(a => a.category === 'Hacking News').slice(0, 3);

  const categories = [
    { name: 'News', href: '/news', color: 'from-blue-500 to-cyan-500', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
    { name: 'AI News', href: '/ai-news', color: 'from-emerald-500 to-teal-500', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { name: 'Cybersecurity', href: '/cybersecurity', color: 'from-cyan-500 to-blue-600', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { name: 'Hacking', href: '/hacking-news', color: 'from-red-500 to-rose-600', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { name: 'Threat Intel', href: '/threat-intelligence', color: 'from-purple-500 to-indigo-600', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    { name: 'Data Breaches', href: '/data-breaches', color: 'from-orange-500 to-red-500', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-cyan/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyber-cyan/5 rounded-full blur-3xl" />
        <div className="absolute top-40 right-0 w-64 h-64 bg-cyber-purple/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-cyber-green/5 rounded-full blur-3xl animate-float-delayed" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 mb-6 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green" />
              </span>
              <span className="text-sm text-cyber-cyan font-medium">Live Threat Intelligence</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight animate-slide-up">
              <span className="hb-gradient-text">CyberShield</span>{' '}
              <span className="text-white">Alerts</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up">
              Daily Cybersecurity, AI & Hacking News —{' '}
              <span className="text-gray-300">curated threat intelligence for security professionals.</span>
            </p>

            <div className="flex flex-wrap justify-center gap-8 mb-10 animate-fade-in">
              {[
                { value: '500+', label: 'Articles', color: 'text-cyber-cyan' },
                { value: '50K+', label: 'Readers', color: 'text-cyber-green' },
                { value: '24/7', label: 'Updates', color: 'text-cyber-purple' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className={`text-3xl md:text-4xl font-display font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link href="/news" className="hb-button px-8 py-3.5 text-center">
                Explore News
              </Link>
              <Link href="/about" className="hb-button-ghost px-8 py-3.5 text-center">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-cyber-dark/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="hb-section-title">Latest News</h2>
                  <div className="section-divider mt-2" />
                </div>
                <Link href="/news" className="text-sm text-cyber-cyan hover:text-cyber-cyan/80 transition-colors font-medium">
                  View all &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {latestArticles.slice(0, 4).map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <TrendingWidget articles={trendingArticles} />
              <div className="hb-glass-card p-6">
                <h3 className="text-base font-display font-bold text-white mb-2">Stay Informed</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Get daily cybersecurity updates delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="hb-input text-sm"
                  />
                  <button className="hb-button w-full text-sm">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {aiArticles.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="hb-section-title">
                  AI <span className="text-cyber-green">News</span>
                </h2>
                <div className="section-divider mt-2" />
              </div>
              <Link href="/ai-news" className="text-sm text-cyber-cyan hover:text-cyber-cyan/80 transition-colors font-medium">
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

      {hackArticles.length > 0 && (
        <section className="py-16 bg-cyber-dark/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="hb-section-title">
                  Hacking <span className="text-red-400">News</span>
                </h2>
                <div className="section-divider mt-2" />
              </div>
              <Link href="/hacking-news" className="text-sm text-cyber-cyan hover:text-cyber-cyan/80 transition-colors font-medium">
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

      {cyberArticles.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="hb-section-title">
                  <span className="text-cyber-cyan">Cyber</span>security
                </h2>
                <div className="section-divider mt-2" />
              </div>
              <Link href="/cybersecurity" className="text-sm text-cyber-cyan hover:text-cyber-cyan/80 transition-colors font-medium">
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

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="hb-section-title">Browse by Category</h2>
            <div className="section-divider mx-auto mt-2" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group hb-card-hover text-center"
              >
                <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={category.icon} />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/10 via-cyber-green/5 to-cyber-purple/10" />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-10 left-10 w-40 h-40 bg-cyber-cyan/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyber-green/10 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-green/10 border border-cyber-green/20 mb-6">
            <svg className="w-4 h-4 text-cyber-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-sm text-cyber-green font-medium">Newsletter</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 leading-tight">
            Never Miss a Threat
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Join 50,000+ security professionals who get daily cybersecurity intelligence updates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="hb-input flex-1"
            />
            <button className="hb-button whitespace-nowrap">
              Subscribe Free
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-4">
            No spam. Unsubscribe anytime. Read by security teams at Fortune 500 companies.
          </p>
        </div>
      </section>
    </div>
  );
}
