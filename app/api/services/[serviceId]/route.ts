import { Service, services } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';


export async function GET(request: Request,
                          { params }: { params: Promise<{ serviceId: string }> }) {
  const serviceId = (await params).serviceId;

  const data = await sBase
    .select()
    .from(services)
    .where(eq(services.id, serviceId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}


export async function PUT(request: Request,
                          { params }: { params: Promise<{ serviceId: string }> }) {
  const serviceId = (await params).serviceId;


  const service = await request.json() as Service;

  const data = await sBase
    .update(services).set({
      ...service,
      id: serviceId
    })
    .where(eq(services.id, serviceId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function DELETE(request: Request,
                             { params }: { params: Promise<{ serviceId: string }> }) {
  const serviceId = (await params).serviceId;
  const data = await sBase.delete(services).where(eq(services.id, serviceId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}