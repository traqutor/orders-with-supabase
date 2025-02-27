import { NewShipment, Shipment, shipments } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';


export async function GET(request: Request,
                          { params }: { params: Promise<{ shipmentId: string }> }) {
  const shipmentId = (await params).shipmentId;

  const data = await sBase
    .select()
    .from(shipments)
    .where(eq(shipments.id, shipmentId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}


export async function POST(request: Request,
                           { params }: { params: Promise<{ shipmentId: string }> }) {
  const shipmentId = (await params).shipmentId;
  const shipment = await request.json() as NewShipment;

  const data = await sBase.insert(shipments).values({ ...shipment, id: shipmentId });

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function PUT(request: Request,
                          { params }: { params: Promise<{ shipmentId: string }> }) {
  const shipmentId = (await params).shipmentId;

  const shipment = await request.json() as Shipment;

  const data = await sBase.update(shipments).set({ ...shipment, id: shipmentId }).where(eq(shipments.id, shipmentId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function DELETE(request: Request,
                             { params }: { params: Promise<{ shipmentId: string }> }) {
  const shipmentId = (await params).shipmentId;

  const data = await sBase.delete(shipments).where(eq(shipments.id, shipmentId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}