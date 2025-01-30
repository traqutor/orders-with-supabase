import { getOrdersWithStatus } from '@/lib/db/orders_queries';
import { OrdersTable } from '@/app/(protected)/orders/orders-table';
import React from 'react';

export default async function OrdersPage(
  props: {
    searchParams: Promise<{ q: string; offset: string }>;
    params: Promise<{ orderSlug: string }>;
  }
) {

  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;


  const { orderSlug } = await props.params;

  const { orders, newOffset, totalOrdersCounter } = await getOrdersWithStatus(
    search,
    Number(offset),
    orderSlug
  );

  return (
    <OrdersTable
      orders={orders}
      offset={newOffset ?? 0}
      totalProducts={totalOrdersCounter}
    />
  );
}