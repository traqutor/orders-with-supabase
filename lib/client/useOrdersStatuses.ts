import { useEffect, useState } from 'react';
import { NewOrderStatus, OrderStatus } from '@/lib/db/schema';
import { deleteData, getData, postData, putData } from '@/utils/helpers';


export function useOrdersStatuses() {
  const url = '/api/dashboard/orders_statuses';
  const [ordersStatuses, setOrdersStatuses] = useState<OrderStatus[]>([]);

  useEffect(() => {
    fetchOrdersStatuses();
  }, []);

  const fetchOrdersStatuses = async (): Promise<OrderStatus[]> => {
    const response = await getData<OrderStatus[]>({ url });

    if (response.error) throw new Error(`Get list of Orders Statuses error: ${JSON.stringify(response)}`);

    setOrdersStatuses(response.data);

    return response.data;
  };

  const createOrderStatus = async (payload: NewOrderStatus) => {
    const response = await postData({ url, data: payload });

    if (response.error) throw new Error(`Create OrderStatus: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const updateOrderStatus = async (payload: OrderStatus) => {
    const response = await putData({ url, data: payload });

    if (response.error) throw new Error(`Update OrderStatus: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const deleteOrderStatus = async (payload: OrderStatus) => {
    const response = await deleteData({ url, data: payload });

    if (response.error) throw new Error(`Delete OrderStatus: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };


  return {

    ordersStatuses,
    createOrderStatus,
    deleteOrderStatus,
    fetchOrdersStatuses,
    updateOrderStatus,
  };

}
