import { eq } from 'drizzle-orm/sql/expressions/conditions';
import { sBase } from '@/lib/db/db';

import { Customer, customers, NewCustomer } from '@/lib/db/schema';

export async function GET(request: Request,
                          { params }: { params: Promise<{ customerId: string }> }) {
  const customerId = (await params).customerId;
  const data = await sBase
    .select()
    .from(customers)
    .where(eq(customers.id, customerId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}




export async function PUT(request: Request,
                          { params }: { params: Promise<{ customerId: string }> }) {
  const customerId = (await params).customerId;
  const invoice = await request.json() as Customer;
  const data = await sBase
    .update(customers)
    .set({ ...invoice, id: customerId })
    .where(eq(customers.id, customerId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function DELETE(request: Request,
                             { params }: { params: Promise<{ customerId: string }> }) {
  const customerId = (await params).customerId;
  const data = await sBase
    .delete(customers)
    .where(eq(customers.id, customerId));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}