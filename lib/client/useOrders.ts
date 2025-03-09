import { deleteData, getData, postData, putData } from '@/utils/helpers';
import { Order } from '@/lib/db/schema';


export function useOrders() {
  const url = '/api/dashboard/orders';

  const fetchOrders = async () => {
    const response = await getData<Order[]>({ url });

    if (response.error) throw new Error(`Get list of Orders Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const createOrder = async (payload: Order) => {
    const response = await postData({ url, data: payload });

    if (response.error) throw new Error(`Create Order: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const updateOrder = async (payload: Order) => {
    const response = await putData({ url: `${url}/${payload.id}`, data: payload });

    if (response.error) throw new Error(`Update Order: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const deleteOrder = async (payload: Order) => {
    const response = await deleteData({ url: `${url}/${payload.id}` });

    if (response.error) throw new Error(`Delete Order: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  return {
    createOrder,
    deleteOrder,
    fetchOrders,
    updateOrder
  };

}
