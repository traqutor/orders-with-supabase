import { OrderPosition, orders_positions } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';


export async function GET(request: Request,
                          { params }: { params: Promise<{ positionId: string }> }) {
  const positionId = (await params).positionId;

  const data = await sBase
    .select()
    .from(orders_positions)
    .where(eq(orders_positions.id, positionId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}


export async function PUT(request: Request,
                          { params }: { params: Promise<{ positionId: string }> }) {
  const positionId = (await params).positionId;
  const position = await request.json() as OrderPosition;

  const data = await sBase
    .update(orders_positions)
    .set({ ...position, id: positionId })
    .where(eq(orders_positions.id, positionId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function DELETE(request: Request,
                             { params }: { params: Promise<{ positionId: string }> }) {
  const positionId = (await params).positionId;

  const data = await sBase.delete(orders_positions).where(eq(orders_positions.id, positionId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}