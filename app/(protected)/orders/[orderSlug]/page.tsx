import { OrdersTable } from '@/app/(protected)/orders/orders-table';
import React from 'react';
import { getOrders } from '@/lib/db/orders_queries';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Session } from '@auth/core/types';

export async function getOrdersHandler({ offsetPage, queryText, pinned, statusId }: {
  offsetPage?: number,
  queryText?: string,
  pinned: boolean,
  statusId?: string,
}) {
  const session = await getServerSession(authOptions);

  console.log('session:', session);

  if (!session) {
    return {
      orders: [], totalOrdersCounter: 0
    };
  }

  return await getOrders({
    queryText,
    offsetPage,
    pinnedUserId: pinned ? session.user?.id : undefined,
    statusId: pinned ? undefined : statusId
  });

}

export default async function OrdersPage(
  props: {
    searchParams: Promise<{ query: string; offset: number }>;
    params: Promise<{ orderSlug: string }>;
    session: Session;
  }
) {

  const searchParams = await props.searchParams;
  const queryText = searchParams.query ?? '';
  const offsetPage = Number(searchParams.offset ?? 1);
  const { orderSlug: orderStatusId } = await props.params;

  const { orders, totalOrdersCounter } = await getOrdersHandler({
    queryText,
    offsetPage,
    pinned: orderStatusId === 'pinned',
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