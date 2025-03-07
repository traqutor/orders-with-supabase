import { NewService, services } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';


export async function POST(request: Request) {
  const service = await request.json() as NewService;

  const data = await sBase
    .insert(services)
    .values({ ...service })
    .returning();

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}