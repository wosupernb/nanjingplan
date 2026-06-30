import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');

  if (!origin || !destination) {
    return NextResponse.json({ error: 'Missing origin or destination' }, { status: 400 });
  }

  try {
    const result = await fetch(
      `https://restapi.amap.com/v3/direction/transit/integrated?origin=${origin}&destination=${destination}&city=025&key=${process.env.AMAP_KEY || ''}&strategy=0`,
      { next: { revalidate: 3600 } }
    );
    const data = await result.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch transit' }, { status: 500 });
  }
}
