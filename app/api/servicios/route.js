import serviciosData from '@/app/data/servicios.json'

export async function GET() {
  return new Response(JSON.stringify(serviciosData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
    }
  });
}