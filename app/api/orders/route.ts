import { NextRequest } from 'next/server';
import { getOrders } from '@/lib/db/orders_queries';


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const offsetPage = Number(searchParams.get('offset')) || 1;
  const queryText = searchParams.get('query') || '';

  const { orders } = await getOrders({ offsetPage, queryText });

  return Response.json({
    status: 'success',
    code: 200,
    data: orders
  });
}


