import { Invoice, invoices } from '@/lib/db/schema';

import { eq } from 'drizzle-orm/sql/expressions/conditions';
import { sBase } from '@/lib/db/db';


export async function GET(request: Request,
                          { params }: { params: Promise<{ invoiceId: string }> }) {
  const invoiceId = (await params).invoiceId;
  const data = await sBase
    .select()
    .from(invoices)
    .where(eq(invoices.id, invoiceId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}


export async function PUT(request: Request,
                          { params }: { params: Promise<{ invoiceId: string }> }) {
  const invoiceId = (await params).invoiceId;
  const invoice = await request.json() as Invoice;
  const data = await sBase
    .update(invoices)
    .set({ ...invoice, id: invoiceId })
    .where(eq(invoices.id, invoiceId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function DELETE(request: Request,
                             { params }: { params: Promise<{ invoiceId: string }> }) {
  const invoiceId = (await params).invoiceId;
  const data = await sBase
    .delete(invoices)
    .where(eq(invoices.id, invoiceId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}