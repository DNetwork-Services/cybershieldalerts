# CyberShield Alerts

A modern cybersecurity news and updates website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Dark mode cyber aesthetic with neon accents
- **Static Site Generation**: Fast loading with SSG
- **MDX Support**: Write articles in Markdown with JSX support
- **SEO Optimized**: Sitemap, robots.txt, Open Graph, Twitter Cards
- **Responsive**: Mobile-first design
- **Search**: Client-side article search
- **Categories**: News, AI, Cybersecurity, Hacking, Threat Intelligence
- **Article Features**: TOC, share buttons, related articles, reading progress

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX with gray-matter
- **Deployment**: Vercel/GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/DeepDN/cybershieldalerts-web.git

# Navigate to project
cd cybershieldalerts-web

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run linter
```

## Content Management

### Adding Articles

1. Create a new `.mdx` file in the appropriate content folder:

```
content/
├── news/          # General cybersecurity news
├── ai/            # AI and machine learning articles
├── cyber/         # Cybersecurity analysis
└── hacking/       # Hacking and cybercrime
```

2. Add frontmatter to your article:

```mdx
---
title: "Your Article Title"
date: "2024-12-15"
category: "News"
tags: ["cybersecurity", "data breach"]
author: "CyberShield Team"
readingTime: "5 min read"
description: "A brief description of your article."
coverImage: "https://picsum.photos/seed/yourimage/1200/600"
featured: false
---

# Your Article Content

Write your article content here using Markdown...
```

3. The site will automatically include the new article.

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| title | Yes | Article title |
| date | Yes | Publication date (YYYY-MM-DD) |
| category | Yes | Article category |
| tags | Yes | Array of tags |
| author | Yes | Author name |
| readingTime | Yes | Estimated reading time |
| description | Yes | Short description for previews |
| coverImage | Yes | Cover image URL |
| featured | No | Mark as featured article |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Deploy automatically

### GitHub Pages

```bash
# Build the site
npm run build

# The static export will be in the .next folder
```

Update `next.config.mjs` for static export:

```js
const nextConfig = {
  output: 'export',
  // ... other config
};
```

## Project Structure

```
cybershieldalerts-web/
├── content/              # MDX articles
│   ├── news/
│   ├── ai/
│   ├── cyber/
│   └── hacking/
├── public/               # Static assets
├── scripts/              # Build scripts
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── lib/              # Utilities and constants
│   ├── styles/           # Global styles
│   └── types/            # TypeScript types
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Social Links

- **Instagram**: [@cybershieldalerts](https://www.instagram.com/cybershieldalerts/)
- **LinkedIn**: [Deepak Nemade](https://www.linkedin.com/in/deepak-nemade/)
- **GitHub**: [DeepDN](https://github.com/DeepDN)

## License

MIT License - see [LICENSE](LICENSE) for details.
