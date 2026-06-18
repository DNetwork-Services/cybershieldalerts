# CyberShield Alerts

Daily cybersecurity news website that auto-fetches articles from RSS feeds.

**Live:** [cybershieldalerts.vercel.app](https://cybershieldalerts.vercel.app)

## What it does

- Auto-fetches articles from 3 RSS sources (The Hacker News, CyberSecurityNews, CyberPress)
- Auto-removes articles older than 20 days via Vercel cron jobs
- Displays news across 6 categories: News, AI, Cybersecurity, Hacking, Threat Intelligence, Data Breaches

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (dark cyber aesthetic)
- MDX for articles
- Vercel cron jobs for auto-fetch and cleanup

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

## Deployment

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Add env var: `CRON_SECRET` = any secret string
4. Cron jobs auto-activate after deploy

## License

MIT
