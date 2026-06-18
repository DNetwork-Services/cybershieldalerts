import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles, getRelatedArticles, markdownToHtml } from '@/lib/articles';
import { SITE_URL } from '@/lib/constants';
import ShareButtons from '@/components/ShareButtons';
import TableOfContents from '@/components/TableOfContents';
import ReadingProgress from '@/components/ReadingProgress';
import ArticleCard from '@/components/ArticleCard';

interface ArticlePageProps {
  params: { slug: string[] };
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug.split('/'),
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const slug = params.slug.join('/');
  const article = getArticleBySlug(slug);
  
  if (!article) {
    return { title: 'Article Not Found' };
  }

  const url = `${SITE_URL}/article/${slug}`;

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      siteName: 'CyberShield Alerts',
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.coverImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const slug = params.slug.join('/');
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const contentHtml = await markdownToHtml(article.content);
  const relatedArticles = getRelatedArticles(slug, 3);
  const articleUrl = `${SITE_URL}/article/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.description,
    image: article.coverImage,
    datePublished: article.date,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CyberShield Alerts',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  };

  return (
    <>
      <ReadingProgress />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="pt-28 pb-16">
        <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-cyber-cyan transition-colors">Home</Link>
            <span className="text-gray-600">/</span>
            <Link
              href={`/${article.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-cyber-cyan transition-colors"
            >
              {article.category}
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-gray-400 truncate max-w-[200px]">{article.title}</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <Link
              href={`/${article.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-3 py-1 text-sm font-medium bg-cyber-cyan/10 text-cyber-cyan rounded-full border border-cyber-cyan/20 hover:bg-cyber-cyan/20 transition-colors"
            >
              {article.category}
            </Link>
            <time className="text-sm text-gray-500">{article.date}</time>
            <span className="text-gray-600">·</span>
            <span className="text-sm text-gray-500">{article.readingTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 leading-tight">
            {article.title}
          </h1>

          {article.description && (
            <p className="text-lg text-gray-400 mb-6 leading-relaxed">{article.description}</p>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-cyber-gray/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-green flex items-center justify-center text-cyber-black font-bold text-sm">
                CS
              </div>
              <div>
                <div className="text-sm font-medium text-white">{article.author}</div>
                <div className="text-xs text-gray-500">{article.date}</div>
              </div>
            </div>
            <ShareButtons title={article.title} url={articleUrl} />
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-cyber-dark">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/50 via-transparent to-transparent" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <aside className="hidden lg:block">
              <TableOfContents content={article.content} />
            </aside>

            <div className="lg:col-span-3 max-w-4xl">
              <div className="lg:hidden mb-8">
                <TableOfContents content={article.content} />
              </div>

              <div
                className="prose-cyber max-w-none"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />

              <div className="mt-12 pt-8 border-t border-cyber-gray/20">
                <h4 className="text-sm font-semibold text-gray-400 mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/search?q=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 text-sm bg-cyber-gray/50 text-gray-300 rounded-lg hover:bg-cyber-cyan/10 hover:text-cyber-cyan transition-all"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-cyber-gray/20">
                <ShareButtons title={article.title} url={articleUrl} />
              </div>

              <div className="mt-12 hb-glass-card p-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-cyber-gray/50 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Join the Discussion</h3>
                <p className="text-gray-400 text-sm">
                  Comments coming soon. Follow us on social media for real-time discussions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <section className="py-16 bg-cyber-dark/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="hb-section-title">Related Articles</h2>
              <div className="section-divider mt-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <ArticleCard key={related.slug} article={related} />
              ))}
            </div>
          </div>
        </section>
      )}

      <PrevNextNav currentSlug={slug} />
    </>
  );
}

function PrevNextNav({ currentSlug }: { currentSlug: string }) {
  const articles = getAllArticles();
  const currentIndex = articles.findIndex(a => a.slug === currentSlug);
  const prev = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;
  const next = currentIndex > 0 ? articles[currentIndex - 1] : null;

  return (
    <section className="py-12 border-t border-cyber-gray/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prev && (
            <Link href={`/article/${prev.slug}`} className="hb-card-hover group text-left">
              <span className="text-xs text-gray-500">&larr; Previous</span>
              <h4 className="text-sm font-medium text-white mt-1 group-hover:text-cyber-cyan transition-colors line-clamp-2">
                {prev.title}
              </h4>
            </Link>
          )}
          {next && (
            <Link href={`/article/${next.slug}`} className="hb-card-hover group text-right">
              <span className="text-xs text-gray-500">Next &rarr;</span>
              <h4 className="text-sm font-medium text-white mt-1 group-hover:text-cyber-cyan transition-colors line-clamp-2">
                {next.title}
              </h4>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
