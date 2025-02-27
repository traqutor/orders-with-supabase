import { Customer, customers, NewCustomer } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';

export async function GET() {
  const data = await sBase.select().from(customers);

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}


export async function POST(request: Request) {
  const customer = await request.json() as NewCustomer;
  const data = await sBase.insert(customers).values({ ...customer });

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function PUT(request: Request) {
  const customer = await request.json() as Customer;
  const data = await sBase.update(customers).set(customer).where(eq(customers.id, customer.id));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function DELETE(request: Request) {
  const customer = await request.json() as Customer;
  const data = await sBase.delete(customers).where(eq(customers.id, customer.id));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}