import { NextRequest } from 'next/server';
import { getOrders } from '@/lib/db/orders_queries';
import { NewOrder, orders } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { getServerSession } from 'next-auth/next';


export async function GET(request: NextRequest) {

  const session = await getServerSession();

  if (!session) {
    Response.json({ status: 'error', code: 401, message: 'You must be logged in.' });
    return;
  }

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

  const session = await getServerSession();

  if (!session) {
    Response.json({ status: 'error', code: 401, message: 'You must be logged in.' });
    return;
  }

  const order = await request.json() as NewOrder;
  const data = await sBase
    .insert(orders)
    .values({ ...order, created_by: session.user.id })
    .returning();

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}