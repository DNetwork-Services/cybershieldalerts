export interface SearchArticle {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  author: string;
  readingTime: string;
  description: string;
  coverImage: string;
  featured: boolean;
  content: string;
}

export function searchArticlesLocal(articles: SearchArticle[], query: string): SearchArticle[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];

  return articles.filter(article =>
    article.title.toLowerCase().includes(lowerQuery) ||
    article.description.toLowerCase().includes(lowerQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    article.content.toLowerCase().includes(lowerQuery)
  );
}
