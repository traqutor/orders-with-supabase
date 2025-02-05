import { createClient } from '@/utils/supabase/client';
import { PRODUCTS_PER_PAGE } from '@/lib/utils';

import { QueryData } from '@supabase/supabase-js';
import { Tables } from '@/types_db';

const supabase = createClient();

type OrderQueryParams = {
  offset: number,
  limit: number,
  search?: string,
  statusId?: string,
  pinnedToUserId?: string
}

const ordersListQuery = (params: OrderQueryParams) => {
  if (params.search && params.statusId) {
    return supabase
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
      .eq('status_id', params.statusId)
      .textSearch('title', params.search)
      .order('seq', { ascending: false })
      .range(params.offset, params.offset + params.limit - 1);
  }

  if (params.statusId) {
    return supabase
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
      .eq('status_id', params.statusId)
      .order('seq', { ascending: false })
      .range(params.offset, params.offset + params.limit - 1);
  }

  if (params.search) {
    return supabase
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
      .textSearch('title', params.search)
      .order('seq', { ascending: false })
      .range(params.offset, params.offset + params.limit - 1);
  }


  return supabase
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
    .order('seq', { ascending: false })
    .range(params.offset, params.offset + params.limit - 1);
};

async function getOrders(
  search: string,
  offset: number
): Promise<{ orders: any[]; newOffset: number; totalOrdersCounter: number }> {

  const { count } = await supabase
    .from('orders')
    .select(
      `*`, { count: 'exact', head: true }
    );

  const { data, error } = await ordersListQuery({ offset, search, limit: PRODUCTS_PER_PAGE });

  if (error) throw new Error(`Get list of Orders error: ${JSON.stringify(error)}`);

  const ordersList: any = data as QueryData<any>;

  if (!data && offset === null) {
    return { orders: data, newOffset: 0, totalOrdersCounter: 0 };
  }

  const totalOrdersCounter = count || 0;
  const newOffset = offset + PRODUCTS_PER_PAGE;


  return {
    orders: ordersList,
    newOffset: newOffset,
    totalOrdersCounter: totalOrdersCounter
  };
}

async function getOrdersWithStatus(
  search: string,
  offset: number,
  statusId: string
): Promise<{ orders: any[]; newOffset: number; totalOrdersCounter: number }> {

  const { count } = await supabase
    .from('orders')
    .select(
      `*`, { count: 'exact', head: true }
    ).eq('status_id', statusId);

  const { data, error } = await ordersListQuery({ offset, search, limit: PRODUCTS_PER_PAGE, statusId });

  if (error) throw new Error(`Get list of Orders with status_id: ${statusId}  error: ${JSON.stringify(error)}`);

  const ordersList: any = data as QueryData<any>;

  if (!data && offset === null) {
    return { orders: data, newOffset: 0, totalOrdersCounter: 0 };
  }

  const totalOrdersCounter = count || 0;
  const newOffset = offset + PRODUCTS_PER_PAGE;


  return {
    orders: ordersList,
    newOffset: newOffset,
    totalOrdersCounter: totalOrdersCounter
  };
}

async function getPinnedOrders(
  search: string,
  offset: number,
  userId: string
): Promise<{ orders: any[]; newOffset: number; totalOrdersCounter: number }> {

  const { count } = await supabase
    .from('pinned_orders')
    .select(
      `orders(*)`, { count: 'exact', head: true }
    ).eq('user_id', userId);

  const { data, error } = await supabase
    .from('pinned_orders')
    .select(
      `orders(*,labels(*),
        orders_statuses(*),
        pinned_orders(*),
        orders_actions(*, actions(*)),
        customers(*))
       `
    )
    .eq('user_id', userId)
    .range(offset, offset + PRODUCTS_PER_PAGE - 1);

  if (error) throw new Error(`Get list of Pinned Orders with user_id: ${userId}  error: ${JSON.stringify(error)}`);

  if (!data && offset === null) {
    return { orders: data, newOffset: 0, totalOrdersCounter: 0 };
  }

  const responseData = data?.map((item: any) => {
    return item.orders;
  }).sort((i: {seq: number}, j: {seq: number}) => j.seq - i.seq);
  const totalOrdersCounter = count || 0;
  const newOffset = offset + PRODUCTS_PER_PAGE;


  return {
    orders: responseData,
    newOffset: newOffset,
    totalOrdersCounter: totalOrdersCounter
  };
}


async function getOrderById(
  orderId: string
): Promise<{ order: any }> {

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
    .eq('id', orderId);

  if (error) throw new Error(`Get Order by id: ${orderId} error: ${JSON.stringify(error)}`);

  return {
    order: data[0]
  };

}

const postOrder = async (order: Tables<'orders'>) => {
  const db = createClient();

  return db
    .from('orders')
    .insert(order)
    .select();
};

const putOrder = async (order: Tables<'orders'>) => {
  const db = createClient();

  return db
    .from('orders')
    .update(order)
    .eq('id', order.id)
    .select();
};


export { getOrders, getOrdersWithStatus, getPinnedOrders, postOrder, putOrder, getOrderById };
