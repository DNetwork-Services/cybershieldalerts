import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Article } from '@/types';

const contentDirectory = path.join(process.cwd(), 'content');

export function getAllArticles(): Article[] {
  const categories = ['news', 'ai', 'cyber', 'hacking'];
  const articles: Article[] = [];

  for (const category of categories) {
    const categoryPath = path.join(contentDirectory, category);
    if (!fs.existsSync(categoryPath)) continue;

    const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.mdx'));

    for (const file of files) {
      const filePath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      const slug = file.replace(/\.mdx$/, '');

      articles.push({
        slug: `${category}/${slug}`,
        title: data.title || '',
        date: data.date || '',
        category: data.category || category,
        tags: data.tags || [],
        author: data.author || 'CyberShield Team',
        readingTime: data.readingTime || '5 min read',
        description: data.description || '',
        coverImage: data.coverImage || `https://picsum.photos/seed/${slug}/1200/600`,
        featured: data.featured || false,
        content,
      });
    }
  }

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): Article | null {
  const articles = getAllArticles();
  return articles.find(article => article.slug === slug) || null;
}

export function getArticlesByCategory(category: string): Article[] {
  const articles = getAllArticles();
  return articles.filter(article => 
    article.category.toLowerCase().replace(/\s+/g, '-') === category ||
    article.slug.startsWith(category + '/')
  );
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter(article => article.featured);
}

export function getLatestArticles(count: number = 6): Article[] {
  return getAllArticles().slice(0, count);
}

export function getRelatedArticles(currentSlug: string, count: number = 3): Article[] {
  const currentArticle = getArticleBySlug(currentSlug);
  if (!currentArticle) return [];

  const articles = getAllArticles();
  
  return articles
    .filter(article => article.slug !== currentSlug)
    .map(article => ({
      article,
      relevance: 
        (article.category === currentArticle.category ? 2 : 0) +
        article.tags.filter(tag => currentArticle.tags.includes(tag)).length
    }))
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, count)
    .map(item => item.article);
}

export async function markdownToHtml(markdown: string): Promise<string> {
  try {
    const result = await remark().use(html).process(markdown);
    return result.toString();
  } catch (error) {
    console.error('Markdown parsing error:', error);
    return markdown.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>');
  }
}

export function getCategories() {
  const articles = getAllArticles();
  const categoryMap = new Map<string, number>();

  articles.forEach(article => {
    const cat = article.category;
    categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
  });

  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    count,
  }));
}

export function getAllTags(): { tag: string; count: number }[] {
  const articles = getAllArticles();
  const tagMap = new Map<string, number>();

  articles.forEach(article => {
    article.tags.forEach(tag => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function searchArticles(query: string): Article[] {
  const articles = getAllArticles();
  const lowerQuery = query.toLowerCase();

  return articles.filter(article =>
    article.title.toLowerCase().includes(lowerQuery) ||
    article.description.toLowerCase().includes(lowerQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    article.content.toLowerCase().includes(lowerQuery)
  );
}
