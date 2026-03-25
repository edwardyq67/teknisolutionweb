import politicasData from '@/app/data/politicas.json'

export async function GET() {
  return new Response(JSON.stringify(politicasData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
    }
  });
}