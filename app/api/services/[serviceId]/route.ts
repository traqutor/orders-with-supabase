import { services_positions } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';


export async function GET(request: Request,
                          { params }: { params: Promise<{ serviceId: string }> }) {
  const serviceId = (await params).serviceId;

  const data = await sBase
    .select()
    .from(services_positions)
    .where(eq(services_positions.service_id, serviceId))
    .orderBy(services_positions.seq);

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}
