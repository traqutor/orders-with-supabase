import { OrdersTable } from './orders-table';
import { getOrders } from '@/lib/db/orders_queries';


export default async function OrdersPage(
  props: {
    searchParams: Promise<{ query: string; offset: string }>;
  }
) {

  const searchParams = await props.searchParams;
  const offsetPage = Number(searchParams.offset) || 1;
  const queryText = searchParams.query;


  const { orders, totalOrdersCounter } = await getOrders({ offsetPage, queryText });

  return (
    <OrdersTable
      orders={orders}
      offset={offsetPage}
      totalProducts={totalOrdersCounter}
    />
  );
}