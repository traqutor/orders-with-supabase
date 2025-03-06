import { OrdersTable } from '@/app/(protected)/orders/orders-table';
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { getOrders } from '@/lib/db/orders_queries';

export default async function OrdersPage(
  props: {
    searchParams: Promise<{ query: string; offset: number }>;
    params: Promise<{ orderSlug: string }>;
  }
) {


  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return {};

  const searchParams = await props.searchParams;
  const search = searchParams.query ?? '';
  const offsetPage = Number(searchParams.offset ?? 1);
  const { orderSlug: orderStatusId } = await props.params;


  const { orders, totalOrdersCounter } = await getOrders({
    queryText: search,
    offsetPage: offsetPage,
    pinnedUserId: orderStatusId === 'pinned' ? user.id : undefined,
    statusId: orderStatusId === 'pinned' ? undefined : orderStatusId
  });


  return (
    <OrdersTable
      orders={orders}
      offset={offsetPage}
      totalProducts={totalOrdersCounter}
    />
  );
}