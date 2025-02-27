import { NewOrderAction, OrderAction, orders_actions } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';


export async function GET(request: Request,
                          { params }: { params: Promise<{ oActionId: string }> }) {
  const oActionId = (await params).oActionId;
  const data = await sBase
    .select()
    .from(orders_actions)
    .where(eq(orders_actions.id, +oActionId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function POST(request: Request,
                           { params }: { params: Promise<{ oActionId: string }> }) {
  const oActionId = (await params).oActionId;
  const order_action = await request.json() as NewOrderAction;
  const data = await sBase.insert(orders_actions).values({ ...order_action, id: +oActionId });

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function PUT(request: Request,
                          { params }: { params: Promise<{ oActionId: string }> }) {
  const oActionId = (await params).oActionId;
  const order_action = await request.json() as OrderAction;
  const data = await sBase
    .update(orders_actions)
    .set({ ...order_action, id: +oActionId })
    .where(eq(orders_actions.id, +oActionId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function DELETE(request: Request,
                             { params }: { params: Promise<{ oActionId: string }> }) {
  const oActionId = (await params).oActionId;
  const data = await sBase.delete(orders_actions).where(eq(orders_actions.id, +oActionId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}