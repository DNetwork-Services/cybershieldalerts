import { NextResponse } from 'next/server';
import { fetchRSS, cleanupOldArticles } from '../../../../scripts/fetch-rss.mjs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  // Verify cron secret for security
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('Starting RSS fetch...');
    const newArticles = await fetchRSS();
    
    console.log('Cleaning up old articles...');
    // cleanupOldArticles is called inside fetchRSS
    
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
