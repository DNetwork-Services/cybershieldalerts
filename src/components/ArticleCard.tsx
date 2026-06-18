import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  compact?: boolean;
}

export default function ArticleCard({ article, featured = false, compact = false }: ArticleCardProps) {
  if (compact) {
    return (
      <Link href={`/article/${article.slug}`} className="group block">
        <div className="flex gap-3 items-start">
          <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-[#0a0a12] border border-cyber-gray/20">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="64px"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-mono text-cyber-cyan uppercase tracking-wider">{article.category}</span>
            <h4 className="text-sm font-medium text-gray-300 mt-0.5 line-clamp-2 group-hover:text-cyber-cyan transition-colors leading-snug">
              {article.title}
            </h4>
            <p className="text-[10px] font-mono text-gray-600 mt-1">{article.readingTime}</p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/article/${article.slug}`} className="group block h-full">
      <article className={`hb-card-hover h-full flex flex-col ${featured ? 'md:flex-row' : ''}`}>
        <div className={`relative overflow-hidden rounded-lg bg-[#0a0a12] ${
          featured ? 'md:w-2/5 aspect-video md:aspect-auto' : 'aspect-video'
        }`}>
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
            sizes={featured ? '(max-width: 768px) 100vw, 40vw' : '(max-width: 768px) 100vw, 33vw'}
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05050a]/80 via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-medium rounded-md bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/20">
              {article.category}
            </span>
          </div>
          {article.featured && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-bold rounded-md bg-cyber-green/15 text-cyber-green border border-cyber-green/30 uppercase tracking-wider">
                Featured
              </span>
            </div>
          )}
        </div>

        <div className={`flex flex-col flex-1 p-4 ${featured ? 'md:p-5 md:w-3/5' : ''}`}>
          <div className="flex items-center gap-2 text-[11px] font-mono text-gray-500 mb-2">
            <time dateTime={article.date}>{article.date}</time>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>{article.readingTime}</span>
          </div>

          <h3 className={`font-display font-bold text-white group-hover:text-cyber-cyan transition-colors line-clamp-2 leading-snug ${
            featured ? 'text-lg md:text-xl' : 'text-base'
          }`}>
            {article.title}
          </h3>

          {article.description && (
            <p className="text-gray-500 mt-2 line-clamp-2 flex-1 text-sm leading-relaxed">
              {article.description}
            </p>
          )}

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-cyber-gray/20">
            <span className="text-[11px] font-mono text-gray-500">{article.author}</span>
            <span className="text-[11px] font-mono text-cyber-cyan group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
              Read More
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
