import { getOrdersWithStatus, getPinnedOrders } from '@/lib/db/orders_queries';
import { OrdersTable } from '@/app/(protected)/orders/orders-table';
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { sBase } from '@/lib/db/db';
import { labels } from '@/lib/db/schema';

export default async function OrdersPage(
  props: {
    searchParams: Promise<{ q: string; offset: string }>;
    params: Promise<{ orderSlug: string }>;
  }
) {

  const result = await sBase.select().from(labels);


  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return {};

  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const { orderSlug: orderStatusId } = await props.params;
  let response = { orders: [] as any, newOffset: 0, totalOrdersCounter: 0 };

  if (orderStatusId === 'pinned') {
    const { orders, newOffset, totalOrdersCounter } = await getPinnedOrders(
      search,
      Number(offset),
      user.id
    );

    response = { orders, newOffset, totalOrdersCounter };


  } else {

    const { orders, newOffset, totalOrdersCounter } = await getOrdersWithStatus(
      search,
      Number(offset),
      orderStatusId
    );

    response = { orders, newOffset, totalOrdersCounter };

  }


  return (
    <OrdersTable
      orders={response.orders}
      offset={response.newOffset ?? 0}
      totalProducts={response.totalOrdersCounter}
    />
  );
}