import { createClient } from '@/utils/supabase/client';
import { PRODUCTS_PER_PAGE } from '@/lib/utils';

import { QueryData } from '@supabase/supabase-js';

const supabase = createClient();

const ordersListQuery = (offset: number) => supabase
  .from('orders')
  .select(
    `*,
        labels(*),
        pinned_orders(*),
        orders_statuses(*),
        orders_actions(*, actions(*)),
        customers(*)
       `
  )
  .order('created_at', { ascending: false })
  .range(offset, offset + PRODUCTS_PER_PAGE - 1);


export async function getOrders(
  search: string,
  offset: number
): Promise<{ orders: any[]; newOffset: number; totalOrdersCounter: number }> {


  const { count } = await supabase
    .from('orders')
    .select(
      `*`, { count: 'exact', head: true }
    );

  const { data, error } = await ordersListQuery(offset);

  if (error) throw new Error(`Get list of Orders error:`, error);


  const ordersList: any = data as QueryData<any>;

  // Always search the full table, not per page
  if (data) {
    return {
      orders: ordersList,
      newOffset: offset + PRODUCTS_PER_PAGE - 1,
      totalOrdersCounter: count || 0
    };
  }

  if (!data && offset === null) {
    return { orders: data, newOffset: 0, totalOrdersCounter: 0 };
  }

  const totalOrdersCounter = count || 0;
  const newOffset = offset + PRODUCTS_PER_PAGE;

  return {
    orders: data,
    newOffset,
    totalOrdersCounter
  };
}

export async function getOrdersWithStatus(
  search: string,
  offset: number,
  statusId: string
): Promise<{ orders: any[]; newOffset: number; totalOrdersCounter: number }> {


  const { count } = await supabase
    .from('orders')
    .select(
      `*`, { count: 'exact', head: true }
    ).eq('status_id', statusId);


  const { data, error } = await supabase
    .from('orders')
    .select(
      `*,
        labels(*),
        pinned_orders(*),
        orders_statuses(*),
        orders_actions(*, actions(*)),
        customers(*)
       `
    )
    .eq('status_id', statusId)
    .order('created_at', { ascending: false })
    .range(offset, offset + PRODUCTS_PER_PAGE - 1);

  if (error) throw new Error(`Get list of Orders with status_id: ${statusId}  error:`, error);

  const ordersList: any = data as QueryData<any>;

  if (!data && offset === null) {
    return { orders: data, newOffset: 0, totalOrdersCounter: 0 };
  }

  const totalOrdersCounter = count || 0; // to do select count from orders
  const newOffset = offset + PRODUCTS_PER_PAGE;


  return {
    orders: ordersList,
    newOffset: newOffset,
    totalOrdersCounter: totalOrdersCounter
  };
}

export async function getOrderById(
  orderId: string
): Promise<{ order: any }> {


  const { data, error } = await supabase
    .from('orders')
    .select(
      `*,
        orders_actions(*, actions(*)),
        labels(*),
        orders_statuses(*),
        invoices(*),
        services(*),
        shipments(*),
        orders_positions(*)
       `
    )
    .eq('id', orderId);

  if (error) throw new Error(`Get Order by id: ${orderId} error:`, error);

  return {
    order: data[0]
  };


}

