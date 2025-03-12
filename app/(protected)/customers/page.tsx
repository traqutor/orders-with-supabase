import { CustomersTable } from '@/components/customer/customers-table';
import { sBase } from '@/lib/db/db';
import { CustomerItem, customers, customers_types } from '@/lib/db/schema';
import { eq } from 'drizzle-orm/sql/expressions/conditions';

export default async function Page() {

  const items = await sBase
    .select()
    .from(customers)
    .leftJoin(customers_types, eq(customers.customer_type_id, customers_types.id));

  const customersItems = items as CustomerItem[];
  const total = items.length;

  return (
    <CustomersTable customers={customersItems} offset={0} total={total} />
  );
}
