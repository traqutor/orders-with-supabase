import { NewShipment, shipments } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';


export async function POST(request: Request) {
  const shipment = await request.json() as NewShipment;

  const data = await sBase
    .insert(shipments)
    .values({ ...shipment })
    .returning();

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}