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
          <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-[#0a0a12] border border-[#1a1a2e]">
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
            <h4 className="text-sm font-medium text-gray-300 mt-0.5 line-clamp-2 group-hover:text-cyber-cyan transition-colors">
              {article.title}
            </h4>
            <p className="text-[10px] font-mono text-gray-600 mt-1">{article.readingTime}</p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <div className={`cyber-card-glow h-full flex flex-col ${featured ? 'md:flex-row' : ''}`}>
        {/* Image */}
        <div className={`relative overflow-hidden rounded bg-[#0a0a12] ${
          featured ? 'md:w-1/2 aspect-video md:aspect-auto' : 'aspect-video'
        }`}>
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
            sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
            unoptimized
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#05050a]/80 via-transparent to-transparent" />
          
          <div className="absolute top-2 left-2">
            <span className="cyber-badge">{article.category}</span>
          </div>
          {article.featured && (
            <div className="absolute top-2 right-2">
              <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-cyber-green/20 text-cyber-green rounded border border-cyber-green/30 uppercase">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`flex flex-col flex-1 p-4 ${featured ? 'md:p-5' : ''}`}>
          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600 mb-2 uppercase tracking-wider">
            <span>{article.date}</span>
            <span className="text-[#1a1a2e]">|</span>
            <span>{article.readingTime}</span>
          </div>

          <h3 className={`font-display font-bold text-white group-hover:text-cyber-cyan transition-colors line-clamp-2 ${
            featured ? 'text-lg md:text-xl' : 'text-base'
          }`}>
            {article.title}
          </h3>

          <p className={`text-gray-500 mt-2 line-clamp-2 flex-1 text-sm leading-relaxed`}>
            {article.description}
          </p>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#1a1a2e]/50">
            <span className="text-[10px] font-mono text-gray-600">{article.author}</span>
            <span className="text-[10px] font-mono text-cyber-cyan group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              READ MORE
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
