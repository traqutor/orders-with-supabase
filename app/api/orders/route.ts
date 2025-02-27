import { orders } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';


export async function GET() {
  const data = await sBase
    .select()
    .from(orders)
    .orderBy(orders.seq);

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}
