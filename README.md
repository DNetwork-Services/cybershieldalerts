# CyberShield Alerts

Daily cybersecurity news website that auto-fetches articles from RSS feeds.

**Live:** [cybershieldalerts.vercel.app](https://cybershieldalerts.vercel.app)

## What it does

- Auto-fetches articles from 3 RSS sources (The Hacker News, CyberSecurityNews, CyberPress)
- Auto-removes articles older than 20 days
- Displays news across 6 categories: News, AI, Cybersecurity, Hacking, Threat Intelligence, Data Breaches

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (dark cyber aesthetic)
- MDX for articles
- Vercel cron jobs for auto-fetch and cleanup (Pro plan)
- GitHub Actions for auto-fetch (free alternative)

## Getting Started

```bash
git clone https://github.com/DNetwork-Services/cybershieldalerts.git
cd cybershieldalerts
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run linter |
| `node scripts/fetch-rss.mjs` | Manually fetch latest articles |
| `node scripts/generate-search-data.mjs` | Generate search index |
| `node scripts/generate-sitemap.mjs` | Generate sitemap.xml |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Add environment variable: `CRON_SECRET` = any secure random string
4. Deploy

**Vercel Cron Jobs** (requires Pro/Enterprise):
- `GET /api/fetch-news` — Daily at 6:00 UTC (fetches new articles)
- `GET /api/cleanup` — Daily at 7:00 UTC (removes articles > 20 days)

### GitHub Actions (Free Alternative)

Automatic daily fetch at 6:00 UTC via `.github/workflows/fetch-news.yml`:

1. Add `CRON_SECRET` as a **GitHub Repository Secret** (Settings → Secrets → Actions)
2. Workflow runs daily via cron, commits new articles to `content/`, and pushes
3. Vercel auto-deploys on push

To trigger manually: Actions → "Fetch Latest News" → Run workflow

### Manual Fetch (Local)

```bash
node scripts/fetch-rss.mjs
git add content/
git commit -m "chore: update news articles"
git push
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `CRON_SECRET` | Yes | Secret for cron authentication |

## Project Structure

```
content/
  ├── news/          # General news articles
  ├── ai/            # AI & ML security news
  ├── cyber/         # Cybersecurity news
  └── hacking/       # Hacking & threat intel
scripts/
  ├── fetch-rss.mjs      # Fetch & parse RSS feeds
  ├── generate-search-data.mjs
  └── generate-sitemap.mjs
src/app/api/
  ├── fetch-news/route.ts  # Vercel cron endpoint
  └── cleanup/route.ts     # Vercel cleanup endpoint
```

## License

MIT