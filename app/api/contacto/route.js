import contactoData from '@/app/data/contacto.json'

export async function GET() {
  return new Response(JSON.stringify(contactoData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
    }
  });
}