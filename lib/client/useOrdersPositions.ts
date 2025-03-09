import { useState } from 'react';
import { deleteData, getData, postData, putData } from '@/utils/helpers';
import { NewOrderPosition, OrderPosition } from '@/lib/db/schema';


export function useOrdersPositions() {
  const url = '/api/dashboard/orders_positions';
  const [items, setItems] = useState<OrderPosition[]>([]);


  const fetchOrderPositions = async (orderId: string) => {
    const response = await getData<OrderPosition[]>({ url: `${url}/${orderId}` });

    if (response.error) throw new Error(`Get list of OrderPositions Error: ${JSON.stringify(response)}`);

    setItems(response.data);

    return response.data;
  };

  const createOrderPosition = async (payload: NewOrderPosition) => {
    const response = await postData({ url: `${url}/${payload.order_id}`, data: payload });

    if (response.error) throw new Error(`Create OrderPosition: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };


  const updateOrderPosition = async (payload: OrderPosition) => {
    const response = await putData({ url: `${url}/${payload.order_id}/${payload.id}`, data: payload });

    if (response.error) throw new Error(`Update OrderPosition: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const deleteOrderPosition = async (payload: OrderPosition) => {
    const response = await deleteData({ url: `${url}/${payload.order_id}/${payload.id}`, data: payload });

    if (response.error) throw new Error(`Delete OrderPosition: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };


  return {
    orderPositions: items,
    createOrderPosition,
    fetchOrderPositions,
    deleteOrderPosition,
    updateOrderPosition
  };

}
