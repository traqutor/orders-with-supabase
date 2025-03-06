import { deleteData, getData, postData, putData } from '@/utils/helpers';
import { NewService, Service } from '@/lib/db/schema';


export function useServices() {
  const url = '/api/services';


  const fetchService = async (serviceId: string): Promise<Service[]> => {
    const response = await getData<Service[]>({ url: `${url}/${serviceId}` });

    if (response.status !== 'success') throw new Error(`Get list of Services Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const createService = async (payload: NewService): Promise<Service[]> => {
    const response = await postData({ url, data: payload });

    if (response.status !== 'success') throw new Error(`Create Service: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data as Service[];
  };

  const updateService = async (payload: Service) => {
    const response = await putData({ url: `${url}/${payload.id}`, data: payload });

    if (response.status !== 'success') throw new Error(`Update Service: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const deleteService = async (payload: Service) => {
    const response = await deleteData({ url: `${url}/${payload.id}`, data: payload });

    if (response.status !== 'success') throw new Error(`Delete Service: ${payload} Error: ${JSON.stringify(response)}`);

    return response.data;
  };


  return {
    fetchService,
    createService,
    deleteService,
    updateService
  };

}
