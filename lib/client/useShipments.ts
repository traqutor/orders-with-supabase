import { deleteData, getData, postData, putData } from '@/utils/helpers';
import { NewShipment, Shipment } from '@/lib/db/schema';


export function useShipments() {
  const url = '/api/shipments';


  const fetchShipment = async (shipmentId: string): Promise<Shipment[]> => {
    const response = await getData<Shipment[]>({ url: `${url}/${shipmentId}` });

    if (response.status !== 'success') throw new Error(`Get list of Shipments Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const createShipment = async (payload: NewShipment): Promise<Shipment[]> => {
    const response = await postData({ url, data: payload });

    if (response.status !== 'success') throw new Error(`Create Shipment: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data as Shipment[];
  };

  const updateShipment = async (payload: Shipment) => {
    const response = await putData({ url: `${url}/${payload.id}`, data: payload });

    if (response.status !== 'success') throw new Error(`Update Shipment: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const deleteShipment = async (payload: Shipment) => {
    const response = await deleteData({ url: `${url}/${payload.id}`, data: payload });

    if (response.status !== 'success') throw new Error(`Delete Shipment: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };


  return {
    fetchShipment,
    createShipment,
    deleteShipment,
    updateShipment
  };

}
