import { CustomerType, customers_types, NewCustomerType } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { eq } from 'drizzle-orm/sql/expressions/conditions';

export async function GET() {
  const data = await sBase.select().from(customers_types);

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}


export async function POST(request: Request) {
  const customer_type = await request.json() as NewCustomerType;
  const data = await sBase.insert(customers_types).values({ ...customer_type });

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function PUT(request: Request) {
  const customer_type = await request.json() as CustomerType;
  const data = await sBase.update(customers_types).set(customer_type).where(eq(customers_types.id, customer_type.id));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}

export async function DELETE(request: Request) {
  const customer_type = await request.json() as CustomerType;
  const data = await sBase.delete(customers_types).where(eq(customers_types.id, customer_type.id));

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}