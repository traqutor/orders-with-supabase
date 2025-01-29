import { useEffect, useState } from 'react';
import { Tables } from '@/types_db';
import { getActions } from '@/lib/db/actions';

export type Action = Tables<'actions'>;

export function useActions() {

  const [actions, setActions] = useState<Action[]>([]);


  useEffect(() => {
    fetchActions().then();

    return () => {
      console.log('Actions clean up', actions);

    };
  }, []);

  const fetchActions = async () => {
    const { data, error } = await getActions();

    if (error) throw new Error(`Get list of Actions error:`, error);

    setActions(data);

    return data;
  };

  return {

    actions,
    fetchActions,
  };

}
