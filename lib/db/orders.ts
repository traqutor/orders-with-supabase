import { createClient } from '@/utils/supabase/server';
import { Tables } from '@/types_db';
import { getListQuery } from '@/utils/supabase/queries';


export type SalesOrder = Tables<'orders'>

export async function getOrders(
  search: string,
  offset: number
): Promise<{ orders: Tables<'orders'>[]; newOffset: number; totalOrdersCounter: number }> {

  const supabase = await createClient();


  // Always search the full table, not per page
  if (search) {
    return {
      orders: await getListQuery(supabase, 'orders') as Tables<'orders'>[],
      newOffset: 0,
      totalOrdersCounter: 0
    };
  }

  if (offset === null) {
    return { orders: [], newOffset: 0, totalOrdersCounter: 0 };
  }

  const totalOrdersCounter = 100; // to do select count from orders

  const newOffset = offset + 5;


  return {
    orders: await getListQuery(supabase, 'orders') as Tables<'orders'>[],
    newOffset,
    totalOrdersCounter
  };
}

