import { CustomersTable } from '@/app/(protected)/customers/customers-table';
import { getCustomers } from '@/lib/db/customers';

export default async function CustomersPage(
  props: {
    searchParams: Promise<{ q: string; offset: string }>;
  }
) {

  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;


  const { customers, newOffset, totalOrdersCounter } = await getCustomers(
    search,
    Number(offset)
  );

  return (
    <CustomersTable
      customers={customers}
      offset={newOffset ?? 0}
      totalProducts={totalOrdersCounter}
    />
  );
}
