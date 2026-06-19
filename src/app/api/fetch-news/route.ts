import { NextResponse } from 'next/server';
import { fetchRSS } from '../../../../scripts/fetch-rss.mjs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  const vercelCronHeader = request.headers.get('x-vercel-cron');
  
  const isValidCron = vercelCronHeader === '1' || authHeader === `Bearer ${process.env.CRON_SECRET}`;
  
  if (!isValidCron) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('Starting RSS fetch...');
    const newArticles = await fetchRSS();

    return NextResponse.json({
      success: true,
      message: `Fetched ${newArticles} new articles`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
