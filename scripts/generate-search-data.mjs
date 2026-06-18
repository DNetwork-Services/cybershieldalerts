import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '..', 'content');
const outputDir = path.join(__dirname, '..', 'public');

function generate() {
  const categories = ['news', 'ai', 'cyber', 'hacking'];
  const articles = [];

  for (const category of categories) {
    const categoryPath = path.join(contentDir, category);
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
        content: content.slice(0, 500),
      });
    }
  }

  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(outputDir, 'articles-data.json'),
    JSON.stringify(articles)
  );

  console.log(`Generated search data for ${articles.length} articles`);
}

generate();
