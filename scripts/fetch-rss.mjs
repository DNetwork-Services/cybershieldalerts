import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const RSS_FEEDS = [
  {
    name: 'The Hacker News',
    url: 'https://feeds.feedburner.com/TheHackersNews',
    category: 'Hacking News',
    defaultAuthor: 'The Hacker News',
  },
  {
    name: 'Cyber Security News',
    url: 'https://cybersecuritynews.com/feed/',
    category: 'Cybersecurity',
    defaultAuthor: 'Cyber Security News',
  },
  {
    name: 'CyberPress',
    url: 'https://cyberpress.org/feed/',
    category: 'News',
    defaultAuthor: 'CyberPress',
  },
];

const CONTENT_DIR = path.join(process.cwd(), 'content');
const MAX_ARTICLES_PER_FEED = 10;
const MAX_AGE_DAYS = 20;

const CATEGORY_TO_FOLDER = {
  'Hacking News': 'hacking',
  'Cybersecurity': 'cyber',
  'AI News': 'ai',
  'News': 'news',
  'Data Breaches': 'news',
};

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'CyberShield-Aggregator/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function parseRSS(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    
    const title = extractTag(itemXml, 'title');
    const link = extractTag(itemXml, 'link');
    const description = extractTag(itemXml, 'description');
    const pubDate = extractTag(itemXml, 'pubDate');
    const creator = extractTag(itemXml, 'dc:creator') || extractTag(itemXml, 'author');
    const contentEncoded = extractTag(itemXml, 'content:encoded');
    
    // Extract image from media:content or enclosure
    let image = '';
    const mediaMatch = itemXml.match(/<media:content[^>]+url="([^"]+)"/);
    const enclosureMatch = itemXml.match(/<enclosure[^>]+url="([^"]+)"/);
    if (mediaMatch) image = mediaMatch[1];
    else if (enclosureMatch) image = enclosureMatch[1];

    // Extract categories
    const categories = [];
    const catRegex = /<category[^>]*><!\[CDATA\[(.*?)\]\]><\/category>/g;
    let catMatch;
    while ((catMatch = catRegex.exec(itemXml)) !== null) {
      categories.push(catMatch[1]);
    }

    if (title && link) {
      items.push({
        title: cleanHtml(title),
        link,
        description: cleanHtml(description || ''),
        pubDate,
        creator: creator || 'CyberShield Team',
        image,
        categories,
        content: contentEncoded ? cleanHtml(contentEncoded) : '',
      });
    }
  }

  return items;
}

function extractTag(xml, tag) {
  // Try CDATA first
  const cdataRegex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`);
  const cdataMatch = xml.match(cdataRegex);
  if (cdataMatch) return cdataMatch[1].trim();
  
  // Try normal tags
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`);
  const match = xml.match(regex);
  if (match) return match[1].trim();
  
  // Try self-closing or without closing tag
  const simpleRegex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)(?:</${tag}>|$)`);
  const simpleMatch = xml.match(simpleRegex);
  return simpleMatch ? simpleMatch[1].trim() : '';
}

function cleanHtml(html) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function createSlug(title, source) {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
  
  const sourcePrefix = source.replace(/\s+/g, '-').toLowerCase().slice(0, 20);
  return `${sourcePrefix}-${base}`;
}

function categorizeArticle(title, description, categories) {
  const text = `${title} ${description} ${categories.join(' ')}`.toLowerCase();
  
  if (text.includes('ai ') || text.includes('artificial intelligence') || text.includes('machine learning') || text.includes('llm') || text.includes('gpt') || text.includes('claude') || text.includes('deepseek')) {
    return 'ai';
  }
  if (text.includes('hack') || text.includes('breach') || text.includes('attack') || text.includes('exploit') || text.includes('ransomware') || text.includes('malware') || text.includes('backdoor')) {
    return 'hacking';
  }
  if (text.includes('vulnerability') || text.includes('cve') || text.includes('patch') || text.includes('security update') || text.includes('flaw')) {
    return 'cyber';
  }
  return 'news';
}

function estimateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

function createMDX(item, feed) {
  const date = item.pubDate ? new Date(item.pubDate) : new Date();
  const dateStr = date.toISOString().split('T')[0];
  const readingTime = estimateReadingTime(item.description + ' ' + (item.content || ''));
  const tags = item.categories.slice(0, 5).map(c => c.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
  
  if (tags.length === 0) {
    tags.push('cybersecurity');
    tags.push('news');
  }

  const coverImage = item.image || `https://picsum.photos/seed/${Date.now()}/1200/600`;

  return `---
title: "${item.title.replace(/"/g, '\\"')}"
date: "${dateStr}"
category: "${feed.category}"
tags: [${tags.map(t => `"${t}"`).join(', ')}]
author: "CyberShield Team"
readingTime: "${readingTime}"
description: "${item.description.slice(0, 200).replace(/"/g, '\\"').replace(/\n/g, ' ')}"
coverImage: "${coverImage}"
featured: false
---

${item.description}

${item.content ? `\n${item.content}` : ''}
`;
}

function getExistingArticleSlugs() {
  const slugs = new Set();
  const categories = ['news', 'ai', 'cyber', 'hacking'];
  
  for (const cat of categories) {
    const catDir = path.join(CONTENT_DIR, cat);
    if (fs.existsSync(catDir)) {
      const files = fs.readdirSync(catDir).filter(f => f.endsWith('.mdx'));
      files.forEach(f => slugs.add(f.replace(/\.mdx$/, '')));
    }
  }
  
  return slugs;
}

function cleanupOldArticles() {
  const categories = ['news', 'ai', 'cyber', 'hacking'];
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - MAX_AGE_DAYS);
  let removedCount = 0;

  for (const cat of categories) {
    const catDir = path.join(CONTENT_DIR, cat);
    if (!fs.existsSync(catDir)) continue;

    const files = fs.readdirSync(catDir).filter(f => f.endsWith('.mdx'));
    
    for (const file of files) {
      const filePath = path.join(catDir, file);
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const dateMatch = content.match(/date:\s*["']?(\d{4}-\d{2}-\d{2})["']?/);
        
        if (dateMatch) {
          const articleDate = new Date(dateMatch[1]);
          if (articleDate < cutoffDate) {
            fs.unlinkSync(filePath);
            removedCount++;
            console.log(`  Removed: ${file} (older than ${MAX_AGE_DAYS} days)`);
          }
        }
      } catch (e) {
        console.error(`  Error processing ${file}:`, e.message);
      }
    }
  }

  return removedCount;
}

async function main() {
  console.log('=== CyberShield Alerts - RSS Fetcher ===\n');
  
  // Cleanup old articles first
  console.log(`Cleaning up articles older than ${MAX_AGE_DAYS} days...`);
  const removed = cleanupOldArticles();
  console.log(`Removed ${removed} old articles.\n`);
  
  const existingSlugs = getExistingArticleSlugs();
  let totalNew = 0;

  for (const feed of RSS_FEEDS) {
    console.log(`Fetching: ${feed.name} (${feed.url})`);
    
    try {
      const xml = await fetchUrl(feed.url);
      const items = parseRSS(xml);
      console.log(`  Found ${items.length} articles`);
      
      const feedDir = path.join(CONTENT_DIR, CATEGORY_TO_FOLDER[feed.category] || 'news');
      if (!fs.existsSync(feedDir)) {
        fs.mkdirSync(feedDir, { recursive: true });
      }

      let savedCount = 0;
      for (const item of items.slice(0, MAX_ARTICLES_PER_FEED)) {
        const slug = createSlug(item.title, feed.name.replace(/\s+/g, '-'));
        
        if (existingSlugs.has(slug)) {
          console.log(`  Skipping (exists): ${item.title.slice(0, 60)}...`);
          continue;
        }

        const mdx = createMDX(item, feed);
        const filePath = path.join(feedDir, `${slug}.mdx`);
        
        fs.writeFileSync(filePath, mdx);
        existingSlugs.add(slug);
        savedCount++;
        totalNew++;
        
        console.log(`  Saved: ${item.title.slice(0, 60)}...`);
      }
      
      console.log(`  Saved ${savedCount} new articles from ${feed.name}\n`);
    } catch (error) {
      console.error(`  Error fetching ${feed.name}:`, error.message);
    }
  }

  console.log(`\n=== Done! Total new articles: ${totalNew} ===`);
  return totalNew;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { main as fetchRSS, cleanupOldArticles };
