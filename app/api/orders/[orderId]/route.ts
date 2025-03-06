import { Order, orders } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';


export async function GET(request: Request,
                          { params }: { params: Promise<{ orderId: string }> }) {
  const orderId = (await params).orderId;
  const data = await sBase
    .select()
    .from(orders)
    .where(eq(orders.id, orderId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}


export async function PUT(request: Request,
                          { params }: { params: Promise<{ orderId: string }> }) {
  const orderId = (await params).orderId;
  const order = await request.json() as Order;
  const data = await sBase.update(orders).set({ ...order, id: orderId }).where(eq(orders.id, orderId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function DELETE(request: Request,
                             { params }: { params: Promise<{ orderId: string }> }) {
  const orderId = (await params).orderId;
  const data = await sBase.delete(orders).where(eq(orders.id, orderId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}
