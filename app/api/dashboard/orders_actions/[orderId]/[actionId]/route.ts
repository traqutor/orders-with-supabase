import { OrderAction, orders_actions } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';


/**
 * GET url: /api/dashboard/orders_actions/:orderId/:actionId
 */

export async function GET(request: Request,
                          { params }: { params: Promise<{ actionId: number }> }) {
  const actionId = (await params).actionId;
  const data = await sBase
    .select()
    .from(orders_actions)
    .where(eq(orders_actions.id, actionId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}


/**
 * PUT url: /api/dashboard/orders_actions/:orderId/:actionId, {data: OrderAction}
 */

export async function PUT(request: Request,
                          { params }: { params: Promise<{ actionId: string }> }) {
  const actionId = Number((await params).actionId);
  const order_action = await request.json() as OrderAction;


  const data = await sBase
    .update(orders_actions)
    .set({ ...order_action, id: actionId })
    .where(eq(orders_actions.id, actionId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

/**
 * DELETE url: /api/dashboard/orders_actions/:orderId/:actionId
 */

export async function DELETE(request: Request,
                             { params }: { params: Promise<{ actionId: string }> }) {
  const actionId = Number((await params).actionId);
  const data = await sBase
    .delete(orders_actions)
    .where(eq(orders_actions.id, actionId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}