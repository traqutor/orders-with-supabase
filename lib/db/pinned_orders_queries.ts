import { createClient } from '@/utils/supabase/client';
import { PRODUCTS_PER_PAGE } from '@/lib/utils';

import { QueryData } from '@supabase/supabase-js';
import { Tables, TablesInsert } from '@/types_db';

const supabase = createClient();


async function getOrdersPinned(
  userId: string,
  offset: number
): Promise<{ orders: any[]; newOffset: number; totalOrdersCounter: number }> {


  const { count } = await supabase
    .from('orders')
    .select(
      `*,
      pinned_orders(*)`, { count: 'exact', head: true }
    ).eq('user_id', userId);

  console.log(count);

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
    .eq('user_id', userId)
    .order('seq', { ascending: false })
    .range(offset, offset + PRODUCTS_PER_PAGE - 1);

  if (error) throw new Error(`Get list of Pinned Orders for User Id ${userId} error: ${error}`);

  console.log(data);

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

const pinOrder = async (pin: TablesInsert<'pinned_orders'>) => {
  const db = createClient();

  return db
    .from('pinned_orders')
    .insert(pin)
    .select();
};

const unPinOrder = async (pin: Tables<'pinned_orders'>) => {
  const db = createClient();

  return db
    .from('pinned_orders')
    .delete()
    .eq('id', pin.id)
    .select();
};


export { pinOrder, getOrdersPinned, unPinOrder };