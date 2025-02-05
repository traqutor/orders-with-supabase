import { useEffect, useState } from 'react';
import { Tables } from '@/types_db';
import { getOrdersStatuses } from '@/lib/db/orders_statuses';

export type OrderStatus = Tables<'orders_statuses'>;

export function useOrdersStatuses() {

  const [ordersStatuses, setOrdersStatuses] = useState<OrderStatus[]>([]);

  useEffect(() => {
    fetchOrdersStatuses().then();

  }, []);

  const fetchOrdersStatuses = async () => {
    const { data, error } = await getOrdersStatuses();

    if (error) throw new Error(`Get list of Orders Statuses error: ${JSON.stringify(error)}`);

    setOrdersStatuses(data);

    return data
  };

  return {

    ordersStatuses,
    fetchOrdersStatuses
  };

}
