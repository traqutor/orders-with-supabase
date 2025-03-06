import { NewServicePosition, services_positions } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';


export async function GET(request: Request,
                          { params }: { params: Promise<{ serviceId: string }> }) {
  const serviceId = (await params).serviceId;

  const data = await sBase
    .select()
    .from(services_positions)
    .where(eq(services_positions.service_id, serviceId))
    .orderBy(services_positions.is_done, services_positions.seq);

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

  const data = await sBase
    .insert(services_positions)
    .values({ ...service_position, service_id: serviceId })
    .returning();

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}