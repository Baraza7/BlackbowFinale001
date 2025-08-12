import { NextResponse } from 'next/server';
import { getUpdatesData } from '@/lib/updates-service';

export async function GET() {
  try {
    const updatesData = await getUpdatesData();
    if (!updatesData) {
      return NextResponse.json({ message: 'Updates config not found' }, { status: 404 });
    }
    const latestUpdates = updatesData.articles
      ?.filter(article => article.published)
      ?.slice(0, 3) || [];
    
    return NextResponse.json(latestUpdates);
  } catch (error) {
    console.error('API route error in /api/latest-updates:', error);
    return NextResponse.json({ message: 'Failed to fetch latest updates' }, { status: 500 });
  }
} 