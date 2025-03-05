import { NextRequest } from 'next/server';
import { eq, like } from 'drizzle-orm/sql/expressions/conditions';
import { Customer, customers, customers_types, CustomerType, NewCustomer } from '@/lib/db/schema';
import { sBase } from '@/lib/db/db';
import { PgSelect } from 'drizzle-orm/pg-core';
import { PRODUCTS_PER_PAGE } from '@/lib/utils';
import { sql } from 'drizzle-orm';


function withPagination<T extends PgSelect>(
  qb: T,
  page: number = 1,
  pageSize: number = PRODUCTS_PER_PAGE
) {

  page = Number(page) < 1 ? 1 : Number(page);

  return qb
    .orderBy(customers.name)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

function withQueryText<T extends PgSelect>(
  qb: T,
  query: string
) {
  return qb.where(like(sql`lower(
  ${customers.name}
  )`, `%${query.toLowerCase()}%`));
}


export type CustomerItem = {
  customers: Customer;
  customers_types: CustomerType;
}


export type CustomerDetails = {}

export type CustomersResponse<T> = {
  status: string,
  code: number,
  data: T
}

export async function GET(request: NextRequest): Promise<Response> {

  const searchParams = request.nextUrl.searchParams;
  const offsetPage = Number(searchParams.get('offset'));
  const queryText = searchParams.get('query');
  const selectAll = searchParams.get('counter');

  let query = sBase
    .select()
    .from(customers)
    .leftJoin(customers_types, eq(customers.customer_type_id, customers_types.id))
    .$dynamic();

  if (queryText) {
    query = withQueryText(query, queryText);
  }

  if (!selectAll) {
    query = withPagination(query, offsetPage);
  }

  const data = await (query);

  return Response.json({
    status: 'success',
    code: 200,
    data
  });
}

export async function POST(request: Request) {
  const customer = await request.json() as NewCustomer;

  const data = await sBase
    .insert(customers)
    .values({ ...customer });

  return Response.json({
    status: 'success',
    code: 200,
    data: data
  });
}