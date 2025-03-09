import { actions, NewOrderStatus, orders_statuses, OrderStatus } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';


export async function GET() {
  const data = await sBase.select().from(orders_statuses);

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}


export async function POST(request: Request) {
  const status = await request.json() as NewOrderStatus;
  const data = await sBase.insert(orders_statuses).values({ ...status });

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function PUT(request: Request) {
  const status = await request.json() as OrderStatus;
  const data = await sBase.update(orders_statuses).set(status).where(eq(actions.id, status.id));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function DELETE(request: Request) {
  const status = await request.json() as OrderStatus;
  const data = await sBase.delete(orders_statuses).where(eq(actions.id, status.id));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}