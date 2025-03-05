import { pinned_orders, PinnedOrder } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';


export async function GET(request: Request,
                          { params }: { params: Promise<{ pinId: string }> }) {
  const pinId = (await params).pinId;
  const data = await sBase
    .select()
    .from(pinned_orders)
    .where(eq(pinned_orders.id, pinId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}


export async function PUT(request: Request,
                          { params }: { params: Promise<{ pinId: string }> }) {
  const pinId = (await params).pinId;
  const order_action = await request.json() as PinnedOrder;
  const data = await sBase
    .update(pinned_orders)
    .set({ ...order_action, id: pinId })
    .where(eq(pinned_orders.id, pinId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function DELETE(request: Request,
                             { params }: { params: Promise<{ pinId: string }> }) {
  const pinId = (await params).pinId;
  const data = await sBase.delete(pinned_orders).where(eq(pinned_orders.id, pinId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}