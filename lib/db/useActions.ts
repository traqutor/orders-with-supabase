import { useEffect, useState } from 'react';
import { deleteData, getData, postData, putData } from '@/utils/helpers';
import { Action, NewAction } from '@/lib/db/schema';



export function useActions() {
  const url = '/api/actions';
  const [actions, setActions] = useState<Action[]>([]);


  useEffect(() => {
    fetchActions().then();

  }, []);

  const fetchActions = async () => {
    const { data, error } = await getData({ url });

    if (error) throw new Error(`Get list of Actions Error: ${JSON.stringify(error)}`);

    setActions(data);

    return data;
  };

  const createAction = async (action: NewAction) => {
    let { data, error } = await postData({ url, data: action });

    if (error) throw new Error(`Create Action: ${action} Error: ${JSON.stringify(error)}`);

    return data;
  };

  const updateAction = async (action: Action) => {
    let { data, error } = await putData({ url, data: action });

    if (error) throw new Error(`Update Action: ${action} Error: ${JSON.stringify(error)}`);

    return data;
  };

  const deleteAction = async (action: Action) => {
    let { data, error } = await deleteData({ url, data: action });

    if (error) throw new Error(`Delete Action: ${action} Error: ${JSON.stringify(error)}`);

    return data;
  };


  return {
    actions,
    createAction,
    deleteAction,
    fetchActions,
    updateAction
  };

}
