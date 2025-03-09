import { invoices, NewInvoice } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';


export async function POST(request: Request) {
  const invoice = await request.json() as NewInvoice;
  const data = await sBase
    .insert(invoices)
    .values({ ...invoice })
    .returning();

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}
