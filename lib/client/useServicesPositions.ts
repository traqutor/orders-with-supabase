import { deleteData, getData, postData, putData } from '@/utils/helpers';
import { NewServicePosition, ServicePosition } from '@/lib/db/schema';


export function useServicesPositions() {
  const url = '/api/dashboard/services';


  const fetchServicePositions = async (serviceId: string): Promise<ServicePosition[]> => {
    const response = await getData<ServicePosition[]>({ url: `${url}/${serviceId}/positions` });

    if (response.error) throw new Error(`Get list of Services Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const createServicePosition = async (payload: NewServicePosition): Promise<ServicePosition[]> => {
    const response = await postData({ url: `${url}/${payload.service_id}/positions`, data: payload });

    if (response.error) throw new Error(`Create ServicePosition: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data as ServicePosition[];
  };

  const updateServicePosition = async (payload: ServicePosition) => {
    const response = await putData({ url: `${url}/${payload.service_id}/positions/${payload.id}`, data: payload });

    if (response.error) throw new Error(`Update ServicePosition: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const deleteServicePosition = async (payload: ServicePosition) => {
    const response = await deleteData({ url: `${url}/${payload.service_id}/positions/${payload.id}`, data: payload });

    if (response.error) throw new Error(`Delete ServicePosition: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };


  return {
    fetchServicePositions,
    createServicePosition,
    deleteServicePosition,
    updateServicePosition
  };

}
