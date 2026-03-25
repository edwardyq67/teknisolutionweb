import inicioData from '@/app/data/inicio.json'

export async function GET() {
  return new Response(JSON.stringify(inicioData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
    }
  });
}