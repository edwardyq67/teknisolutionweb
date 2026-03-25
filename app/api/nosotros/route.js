import nosotrosData from '@/app/data/nosotros.json'

export async function GET() {
  return new Response(JSON.stringify(nosotrosData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
    }
  });
}