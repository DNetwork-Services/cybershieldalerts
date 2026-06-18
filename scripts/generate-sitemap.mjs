import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE_URL = 'https://cybershieldalerts.com';

function getAllArticles() {
  const contentDir = path.join(process.cwd(), 'content');
  const categories = ['news', 'ai', 'cyber', 'hacking'];
  const articles = [];

  for (const category of categories) {
    const categoryPath = path.join(contentDir, category);
    if (!fs.existsSync(categoryPath)) continue;

    const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.mdx'));

    for (const file of files) {
      const filePath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      const slug = file.replace(/\.mdx$/, '');

      articles.push({
        slug: `${category}/${slug}`,
        date: data.date || new Date().toISOString(),
      });
    }
  }

  return articles;
}

function generateSitemap() {
  const articles = getAllArticles();
  
  const staticPages = [
    { url: '/', lastmod: new Date().toISOString(), priority: '1.0' },
    { url: '/news', lastmod: new Date().toISOString(), priority: '0.9' },
    { url: '/ai-news', lastmod: new Date().toISOString(), priority: '0.9' },
    { url: '/cybersecurity', lastmod: new Date().toISOString(), priority: '0.9' },
    { url: '/hacking-news', lastmod: new Date().toISOString(), priority: '0.9' },
    { url: '/threat-intelligence', lastmod: new Date().toISOString(), priority: '0.8' },
    { url: '/data-breaches', lastmod: new Date().toISOString(), priority: '0.8' },
    { url: '/about', lastmod: new Date().toISOString(), priority: '0.7' },
    { url: '/contact', lastmod: new Date().toISOString(), priority: '0.7' },
  ];

  const articlePages = articles.map(article => ({
    url: `/article/${article.slug}`,
    lastmod: article.date,
    priority: '0.8',
  }));

  const allPages = [...staticPages, ...articlePages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
}

function generateRSSFeed() {
  const articles = getAllArticles().sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 20);

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CyberShield Alerts</title>
    <description>Daily Cybersecurity, AI &amp; Hacking News</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${articles.map(article => `    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${SITE_URL}/article/${article.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/article/${article.slug}</guid>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <description><![CDATA[${article.description || ''}]]></description>
    </item>`).join('\n')}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'rss.xml'), rss);
  console.log('RSS feed generated successfully!');
}

generateSitemap();
generateRSSFeed();
