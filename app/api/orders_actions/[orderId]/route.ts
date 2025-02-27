import { orders_actions } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';


export async function GET(request: Request,
                          { params }: { params: Promise<{ orderId: string }> }) {
  const orderId = (await params).orderId;
  const data = await sBase
    .select()
    .from(orders_actions)
    .where(eq(orders_actions.order_id, orderId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}
