import { NextRequest } from 'next/server';
import { getOrders } from '@/lib/db/orders_queries';
import { NewOrder, orders } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';


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


export async function POST(request: Request) {

  const order = await request.json() as NewOrder;
  const data = await sBase
    .insert(orders)
    .values({ ...order})
    .returning();

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}