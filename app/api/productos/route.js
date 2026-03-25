import productosData from '@/app/data/productos.json'

export async function GET() {
  return new Response(JSON.stringify(productosData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
    }
  });
}