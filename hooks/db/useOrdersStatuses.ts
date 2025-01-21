import { useEffect, useState } from 'react';
import { Tables } from '@/types_db';
import { getListQuery } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/client';

export type OrderStatus = Tables<'orders_statuses'>;

export function useOrdersStatuses() {

  const [ordersStatuses, setOrdersStatuses] = useState<OrderStatus[]>([]);


  useEffect(() => {
    fetchOrdersStatuses();

    return () => {
      console.log('Order Statuses clean up', ordersStatuses);
    };
  }, []);

  const fetchOrdersStatuses = async () => {
    const db = createClient();
    const data = await getListQuery(db, 'orders_statuses') as OrderStatus[];

    setOrdersStatuses(data);
  };

  return {

    ordersStatuses,
    fetchOrdersStatuses
  };

}
