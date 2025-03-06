import { NewOrderPosition, orders_positions } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';


export async function GET(request: Request,
                          { params }: { params: Promise<{ orderId: string }> }) {
  const orderId = (await params).orderId;

  const data = await sBase
    .select()
    .from(orders_positions)
    .where(eq(orders_positions.order_id, orderId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function POST(request: Request,
                           { params }: { params: Promise<{ orderId: string }> }) {
  const orderId = (await params).orderId;
  const position = await request.json() as NewOrderPosition;

  const data = await sBase.insert(orders_positions).values({ ...position, order_id: orderId }).returning();

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}