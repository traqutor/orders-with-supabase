import { OrdersTable } from './orders-table';
import { getOrders } from '@/lib/db/orders_queries';

export default async function OrdersPage(
  props: {
    searchParams: Promise<{ q: string; offset: string }>;
  }
) {

  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;


  const { orders, newOffset, totalOrdersCounter } = await getOrders(
    search,
    Number(offset)
  );

  return (
    <OrdersTable
      orders={orders}
      offset={newOffset ?? 0}
      totalProducts={totalOrdersCounter}
    />
  );
}