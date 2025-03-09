import { Action, actions, NewOrderAction, OrderAction, orders_actions } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';

export type OrderActionItem = {
  orders_actions: OrderAction;
  actions: Action;
}

/**
 * GET list of Order's Actions url: /api/dashboard/orders_actions/:orderId
 */

export async function GET(request: Request,
                          { params }: { params: Promise<{ orderId: string }> }) {
  const orderId = (await params).orderId;
  const data = await sBase
    .select()
    .from(orders_actions)
    .leftJoin(actions, eq(orders_actions.action_id, actions.id))
    .where(eq(orders_actions.order_id, orderId));


  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

/**
 * POST new Order's Action url: /api/dashboard/orders_actions/:orderId/:actionId, {data: Action}
 */

export async function POST(request: Request,
                           { params }: { params: Promise<{ orderId: string }> }) {
  const orderId = (await params).orderId;
  const order_action = await request.json() as NewOrderAction;

  const data = await sBase.insert(orders_actions).values({ ...order_action, order_id: orderId });

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}