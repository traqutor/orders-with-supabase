import { OrdersTable } from '@/app/(protected)/orders/orders-table';
import React from 'react';
import { getOrders } from '@/lib/db/orders_queries';
import { getServerSession } from 'next-auth/next';



export default async function Page(
  props: {
    searchParams: Promise<{ query: string; offset: number }>;
    params: Promise<{ orderSlug: string }>;
  }
) {

  const session = await getServerSession();

  if (!session) {
    return {
      orders: [], totalOrdersCounter: 0
    };
  }

  const searchParams = await props.searchParams;
  const queryText = searchParams.query ?? '';
  const offsetPage = Number(searchParams.offset ?? 1);
  const { orderSlug: orderStatusId } = await props.params;

  const { orders, totalOrdersCounter } = await getOrders({
    queryText,
    offsetPage,
    pinnedUserId: orderStatusId === 'pinned' ? session.user?.id : undefined,
    statusId: orderStatusId !== 'pinned' ? orderStatusId : undefined
  });

  return (
    <OrdersTable
      orders={orders}
      offset={offsetPage}
      totalProducts={totalOrdersCounter}
    />
  );
}