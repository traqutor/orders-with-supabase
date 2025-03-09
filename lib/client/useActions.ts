import { deleteData, getData, postData, putData } from '@/utils/helpers';
import { Action, NewAction } from '@/lib/db/schema';


export function useActions() {
  const url = '/api/dashboard/actions';


  const fetchActions = async () => {
    const response = await getData<Action[]>({ url });

    if (response.error) throw new Error(`Get list of Actions Error: ${JSON.stringify(response)}`);
    
    return response.data;
  };

  const createAction = async (action: NewAction) => {
    const response = await postData({ url, data: action });

    if (response.error) throw new Error(`Create Action: ${action} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const updateAction = async (action: Action) => {
    const response = await putData({ url: `${url}/${action.id}`, data: action });

    if (response.error) throw new Error(`Update Action: ${action} Error: ${JSON.stringify(response)}`);

    return response.data;
  };

  const deleteAction = async (action: Action) => {
    const response = await deleteData({ url: `${url}/${action.id}`, data: action });

    if (response.error) throw new Error(`Delete Action: ${action} Error: ${JSON.stringify(response)}`);

    return response.data;
  };


  return {
    createAction,
    deleteAction,
    fetchActions,
    updateAction
  };

}
