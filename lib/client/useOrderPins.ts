import { deleteData, postData } from '@/utils/helpers';
import { NewPinnedOrder, PinnedOrder } from '@/lib/db/schema';


export function useOrderPins() {
  const url = '/api/pinned_orders';


  const pinOrder = async (payload: NewPinnedOrder) => {
    const response = await postData({ url: `${url}/${payload.user_id}`, data: payload });

    if (response.status !== 'success') throw new Error(` Pin Order: ${payload} : ${JSON.stringify(response)}`);

    return response.data;
  };


  const unPinOrder = async (payload: PinnedOrder) => {
    const response = await deleteData({ url, data: payload });

    if (response.status !== 'success') throw new Error(`Delete Pin: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  return {
    pinOrder,
    unPinOrder
  };

}
