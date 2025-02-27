import { NewServicePosition, ServicePosition, services_positions } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';


export async function GET(request: Request,
                          { params }: { params: Promise<{ serviceId: string }> }) {
  const serviceId = (await params).serviceId;

  const data = await sBase
    .select()
    .from(services_positions)
    .where(eq(services_positions.service_id, serviceId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}


export async function POST(request: Request,
                           { params }: { params: Promise<{ serviceId: string }> }) {
  const serviceId = (await params).serviceId;
  const service_position = await request.json() as NewServicePosition;

  const data = await sBase.insert(services_positions).values({ ...service_position, service_id: serviceId });

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function PUT(request: Request,
                          { params }: { params: Promise<{ positionId: string }> }) {
  const positionId = (await params).positionId;


  const service_position = await request.json() as ServicePosition;

  const data = await sBase.update(services_positions).set({
    ...service_position,
    id: positionId
  }).where(eq(services_positions.id, positionId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function DELETE(request: Request,
                             { params }: { params: Promise<{ positionId: string }> }) {
  const positionId = (await params).positionId;
  const data = await sBase.delete(services_positions).where(eq(services_positions.id, positionId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}