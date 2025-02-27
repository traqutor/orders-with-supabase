import { NewOrderLabel, OrderLabel, orders_labels } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';


export async function GET(request: Request,
                          { params }: { params: Promise<{ oLabelId: string }> }) {
  const oLabelId = (await params).oLabelId;

  const data = await sBase
    .select()
    .from(orders_labels)
    .where(eq(orders_labels.id, oLabelId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function POST(request: Request,
                           { params }: { params: Promise<{ oLabelId: string }> }) {
  const oLabelId = (await params).oLabelId;
  const order_label = await request.json() as NewOrderLabel;

  const data = await sBase.insert(orders_labels).values({ ...order_label, id: oLabelId });

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function PUT(request: Request,
                          { params }: { params: Promise<{ oLabelId: string }> }) {
  const oLabelId = (await params).oLabelId;
  const order_label = await request.json() as OrderLabel;
  const data = await sBase
    .update(orders_labels)
    .set({ ...order_label, id: oLabelId })
    .where(eq(orders_labels.id, oLabelId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function DELETE(request: Request,
                             { params }: { params: Promise<{ oLabelId: string }> }) {
  const oLabelId = (await params).oLabelId;
  const data = await sBase.delete(orders_labels).where(eq(orders_labels.id, oLabelId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}