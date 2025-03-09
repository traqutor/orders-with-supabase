import { NewPinnedOrder, pinned_orders } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';


export async function GET(request: Request,
                          { params }: { params: Promise<{ userId: string }> }) {
  const userId = (await params).userId;
  const data = await sBase
    .select()
    .from(pinned_orders)
    .where(eq(pinned_orders.user_id, userId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function POST(request: Request) {
  const order_action = await request.json() as NewPinnedOrder;
  const data = await sBase.insert(pinned_orders).values({ ...order_action });

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}