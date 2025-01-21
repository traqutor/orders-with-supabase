import { useEffect, useState } from 'react';
import { Tables } from '@/types_db';
import { getListQuery } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/client';

export type Action = Tables<'actions'>;

export function useActions() {

  const [actions, setActions] = useState<Action[]>([]);


  useEffect(() => {
    fetchActions();

    return () => {
      console.log('Actions clean up', actions);

    };
  }, []);

  const fetchActions = async () => {
    const db = createClient();
    const data = await getListQuery(db, 'actions') as Action[];

    setActions(data);
  };

  return {

    actions,
    fetchActions
  };

}
