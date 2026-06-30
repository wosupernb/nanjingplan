import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await fetch(
      `https://restapi.amap.com/v3/weather/weatherInfo?city=320100&key=${process.env.AMAP_KEY || ''}&extensions=all`,
      { next: { revalidate: 1800 } }
    );
    const data = await result.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch weather' }, { status: 500 });
  }
}
